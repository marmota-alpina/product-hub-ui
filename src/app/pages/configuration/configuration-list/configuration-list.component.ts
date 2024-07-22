import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {Configuration, DEFAULT_CONTRACT_KEY, SENDER_POSTAL_CODE_KEY} from "../../../models/configuration.model";
import { ConfigurationService } from "../../../services/configuration.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {THREE} from "@angular/cdk/keycodes";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  standalone: true,
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, RouterModule]
})
export class ConfigurationListComponent implements OnInit {
  configurations: Configuration[] = [];
  displayedColumns: string[] = ['key', 'value', 'actions'];

  constructor(
    private configurationService: ConfigurationService,
    protected router: Router,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.configurationService.getConfigurations().subscribe((data) => {
      this.configurations = data;
      this.checkConfiguration(data);
    });
  }

  editConfiguration(id: string): void {
    this.router.navigate([`/configuration/edit/${id}`]);
  }

  deleteConfiguration(id: string): void {
    this.configurationService.deleteConfiguration(id).subscribe(({
      next: () => {
        this.configurations = this.configurations.filter((config) => config.id !== id);
        this.checkConfiguration(this.configurations);
      },
      error: (error) => {
        this.snackBarService.openSnackBar("Error");
      }
    }));
  }

  checkConfiguration(configs: Configuration[]) {
     if(!configs.some(c => c.key === SENDER_POSTAL_CODE_KEY)){
        this.snackBarService.openSnackBar("Missing configuration for SENDER_POSTAL_CODE");
     }
      if(!configs.some(c => c.key === DEFAULT_CONTRACT_KEY)){
        this.snackBarService.openSnackBar("Missing configuration for DEFAULT_CONTRACT");
      }
  }
}
