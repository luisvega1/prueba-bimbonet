import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  isMobileMenuOpen = signal<boolean>(false);
  selectedLang = signal<string>('');

  ngOnInit(): void {
    this.initializeLang();
  }

  initializeLang(): void {
    const lang = JSON.parse(localStorage.getItem('lang') as string);
    this.translateService.use(lang);
    this.selectedLang.set(lang);
  }

  handleCambioIdioma(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.translateService.use(lang);
    this.selectedLang.set(lang);
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  handleLogout(): void {
    this.authService.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
