import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfigurationService } from "../../../services/configuration.service";

@Component({
  standalone: true,
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterModule]
})
export class ConfigurationFormComponent implements OnInit {
  configurationForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configurationForm = this.fb.group({
      key: [undefined, [Validators.required, Validators.minLength(3)]],
      value: [undefined,[Validators.required, Validators.maxLength(255)]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.configurationService.getConfiguration(id).subscribe((data) => {
        this.configurationForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.configurationService.updateConfiguration(id, this.configurationForm.value).subscribe(() => {
        this.router.navigate(['/configurations']);
      });
    } else {
      this.configurationService.createConfiguration(this.configurationForm.value).subscribe(() => {
        this.router.navigate(['/configurations']);
      });
    }
  }
}
