import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Configuration } from "../../../models/configuration.model";
import { ConfigurationService } from "../../../services/configuration.service";

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
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.configurationService.getConfigurations().subscribe((data) => {
      this.configurations = data;
    });
  }

  editConfiguration(id: string): void {
    this.router.navigate([`/configuration/edit/${id}`]);
  }

  deleteConfiguration(id: string): void {
    this.configurationService.deleteConfiguration(id).subscribe(() => {
      this.configurations = this.configurations.filter((config) => config.id !== id);
    });
  }
}
