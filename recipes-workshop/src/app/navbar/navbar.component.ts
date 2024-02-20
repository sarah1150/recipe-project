import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inputValue!: string;
  activeTab!: string;
  hideSearch:boolean=false;
  constructor(private router: Router,private searchService:SearchService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.router.url.includes('details') ? this.hideSearch = true : this.hideSearch = false;
        this.router.url.includes('favourites')? this.activeTab='favourites' : this.activeTab='home';
      }

    });
  }

  ngOnInit(): void {
    this.router.url.includes('favourites')? this.activeTab='favourites' : this.activeTab='home';
  }

  switchTab(current: string) {
    this.activeTab = current;
  }

  onTyping() {
    this.searchService.searchValue.next(this.inputValue);
  }
}
