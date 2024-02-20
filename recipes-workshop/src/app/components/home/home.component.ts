import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { map } from 'rxjs/operators'
import { SearchService } from 'src/app/services/search.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy,DoCheck {
  recipes: Subscription = new Subscription();
  navbarSubj: Subscription = new Subscription()
  recipesList!: any[];
  emptyHeart :boolean= true;
  favouriteRecipe =JSON.parse(localStorage.getItem('FavRecipe')||'[]');
  hidePagination: boolean = true;
  searchValue!: string;
  p: number = 1;
  constructor(private router: Router,private getService: GetService ,private searchService:SearchService) { 
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.router.url.includes('favourites') ? this.recipesList = this.favouriteRecipe : this.recipesList = [];
      }
    });
    this.navbarSubj = this.searchService.searchValue.asObservable().subscribe(valueSelect => {
      this.searchValue = valueSelect;
      if (this.searchValue != null) {
        this.searchData();
      }
    });
  }

  ngOnInit(): void {
    if(this.router.url.includes('home')){
      this.getRecipes();
    }
  }

  ngDoCheck(){
    if(this.router.url.includes('favourites')){
      this.recipesList = JSON.parse(localStorage.getItem('FavRecipe')||'[]');    
    }
  }
  getRecipes() {
    this.recipes = this.getService
      .get('recipes/random?apiKey=a7061f9e958943f7b9a13912b67a2880&number=100').pipe(map(res=> {res?.recipes?.forEach((element:any) => {
        element.emptyHeart=true;
      });
    return res;
    }))
      .subscribe((res:any) => {
        this.recipesList = res.recipes;
        this.recipesList?.length > 6
          ? (this.hidePagination = false)
          : (this.hidePagination = true);
      });
      localStorage.setItem('FavRecipe', JSON.stringify(this.favouriteRecipe));

  }


  switchToFullHeart(i:number){
    this.recipesList[i].emptyHeart=false;
    this.favouriteRecipe.push(this.recipesList[i]);
    localStorage.setItem('FavRecipe', JSON.stringify(this.favouriteRecipe));
    localStorage.setItem('Recipes', JSON.stringify(this.recipesList));
    if(this.router.url.includes('favourites')){
      this.recipesList = this.favouriteRecipe;
    }
  }

  switchToEmptyHeart(i: number){
    this.recipesList[i].emptyHeart=true;
    this.favouriteRecipe = JSON.parse(localStorage.getItem('FavRecipe')||'[]');
    this.favouriteRecipe.splice(i, 1);
    localStorage.setItem('FavRecipe', JSON.stringify(this.favouriteRecipe));
    localStorage.setItem('Recipes', JSON.stringify(this.recipesList));
    if(this.router.url.includes('favourites')){
      this.recipesList = this.favouriteRecipe;
    }
  }

  searchData() {
    this.recipes = this.getService.get(`recipes/findByIngredients?apiKey=a7061f9e958943f7b9a13912b67a2880&ingredients=${this.searchValue.toLowerCase()}&number=6`).pipe(map(res => { res?.recipes?.forEach((element:any) => {
      element.emptyHeart=true;
    });
  return res;
  })).subscribe((res) => {
      this.recipesList =[...res];
      this.hidePagination = true;
    });
  }

  ngOnDestroy(): void {
    this.recipes.unsubscribe();
    this.navbarSubj.unsubscribe();
  }
}
