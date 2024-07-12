import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Configuration } from "../../../models/configuration.model";
import { ConfigurationService } from "../../../services/configuration.service";

@Component({
  standalone: true,
  selector: 'app-configuration-detail',
  templateUrl: './configuration-detail.component.html',
  styleUrls: ['./configuration-detail.component.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule]
})
export class ConfigurationDetailComponent implements OnInit {
  configuration: Configuration | undefined;

  constructor(
    private route: ActivatedRoute,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.configurationService.getConfiguration(id).subscribe((data) => {
      this.configuration = data;
    });
  }
}
