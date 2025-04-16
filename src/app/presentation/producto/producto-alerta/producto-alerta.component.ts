import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-producto-alerta',
  standalone: true,
  templateUrl: './producto-alerta.component.html',
  imports: [CommonModule],
  styleUrl: './producto-alerta.component.scss',
})
export class ProductoAlertaComponent {
  @Input() visible: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() titulo: string = 'Confirmación';
  @Input() mensaje: string = '¿Estás seguro?';
  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();

  cerrar(): void {
    this.visible = false;
    this.onClose.emit();
  }

  confirmar(): void {
    this.onConfirm.emit();
    this.cerrar();
  }
}
