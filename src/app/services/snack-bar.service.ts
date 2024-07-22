import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  ref:  MatSnackBarRef<TextOnlySnackBar> | undefined;
  defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    politeness: 'polite',
    data: {message: 'Hello World!'}
  };

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string | undefined = 'Close', config: MatSnackBarConfig | undefined = undefined) {
    this.ref = this.snackBar.open(message, action, config ?? this.defaultConfig);
  }
}
