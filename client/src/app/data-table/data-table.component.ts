import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Service } from '../services/service';
import { Reclamation } from '../Entities/Reclamation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { CreateReclamationPopupComponent } from '../create-reclamation-popup/create-reclamation-popup.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
  user!: any;
  param!: string;
  title: string = "Liste Des Réclamations ";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: any;
  reclamations : Reclamation[];
  displayedColumns = ['id', 'subject', 'cin', 'date', 'status', 'action'];

  constructor(private service: Service, private dialog: MatDialog, private auth:AuthService,
    private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {
      this.reclamations = [];
    }
  

  ngOnInit() {
    const segments = this.route.snapshot.url;
    if (segments.length > 0) {
      this.param = segments[segments.length - 1].path;
    }

    this.loadReclamation(this.param);
    this.getCurrentUser(); 

    if (this.param == "accepted")
      this.title += "Traitées";
    else if (this.param == "rejected")
      this.title += "Rejetées";
    else if (this.param == "in-progress")
      this.title += "En Attente";
  }  


  loadReclamation(param: any) {
    this.spinner.show();

    this.service.GetReclamation(param).subscribe({next : res => {
      if (res)
        this.spinner.hide();

      this.reclamations = res?.reclamations;
      this.dataSource = new MatTableDataSource<Reclamation>(this.reclamations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;            
    }, error : err => {
      if (err instanceof HttpErrorResponse) {
        if ( err.status === 401 ) {
          this.auth.logout();
          this.router.navigate(['/']);
        }
      }
    }});
  }


  getCurrentUser() {
    this.spinner.show();

    this.auth.currentUser().subscribe({next : res => {
      this.user = res?.user;
    }, error : err => {
      if (err instanceof HttpErrorResponse) {
        if ( err.status === 401 ) {
          this.auth.logout();
          this.router.navigate(['/']);
        }
      }
    }});
  }


  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    if (this.dataSource)
      this.dataSource.filter = value;
  }
  

  editReclamation(id: any) {
    this.openPopup(id);
  }


  createReclamation() {
    this.openCreateReclamationPopup();
  }


  openCreateReclamationPopup() {
    var _popup = this.dialog.open(CreateReclamationPopupComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadReclamation(this.param);
    });
  }


  openPopup(id: any) {
    var _popup = this.dialog.open(PopupComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        id: id,
        userRole: this.user.role,
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadReclamation(this.param);
    });
  }
}
