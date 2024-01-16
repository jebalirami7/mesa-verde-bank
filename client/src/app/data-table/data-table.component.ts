import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Service } from '../service';
import { Reclamation } from '../Entities/Reclamation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit, AfterViewInit {

  param: string | undefined;
  title: string = "Liste Des Réclamations ";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: any;
  reclamations !: Reclamation[];

  constructor(private service: Service, private dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }
  
  loadReclamation(param: any) {
    this.spinner.show();

    this.service.GetReclamation(param).subscribe(res => {
      if (res)
        this.spinner.hide();

      console.log(res?.reclamations)
      this.reclamations = res?.reclamations;
      this.dataSource = new MatTableDataSource<Reclamation>(this.reclamations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (this.table)
        this.table.dataSource = this.dataSource;
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if ( err.status === 401 ) {
          this.router.navigate(['']);
        }
      }
    });
  }
  
  displayedColumns = ['id', 'subject', 'cin', 'date', 'status', 'action'];

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  ngOnInit() {
    const segments = this.route.snapshot.url;
    if (segments.length > 0) {
      this.param = segments[segments.length - 1].path;
    }
    console.log('Current Child Route:', this.param);

    this.loadReclamation(this.param);

    if (this.param == "accepted")
      this.title += "Traitées";
    else if (this.param == "rejected")
      this.title += "Rejetées";
    else if (this.param == "in-progress")
      this.title += "En Attente";
  }  

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    if (this.dataSource)
      this.dataSource.filter = value;
  }
  
  editReclamation(id: any) {
    this.openPopup(id);
  }

  openPopup(id: any) {
    var _popup = this.dialog.open(PopupComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        id: id,
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadReclamation(this.param);
    });
  }
}
