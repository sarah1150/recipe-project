
_RecipesWorkshop_

# Versions
1. angular version 13
2. SASS styles

# Navbar 
# Logic
1. Tabs _Recipes_ route to Home page & _Favourites_ route to Favourites view
2. Search Input (Typed Value is a _BehaviorSubject in service_) and emit value when user enter it
3. Hide Search from Details view (knowing changed URL from _NavigationEnd_)
# Design
1. Fake Logo
2. Tabs from Bootstrap5 with _ngClass_ check where is _active_ 
3. Search Svg Icon 


#  Home page (Recipes View)
#  Logic 
1. API To _get all Recipes_
2. Add Recipes & navSearch Subsciption and kill them in _ngOnDestroy_
3. _Map operator_ to add element to array of recipes to show _Empty Heart_ for every element
4. Function To change from _Empty Heart_ to _Full Heart_  **(Save Recipes array in LocalStorage _with changes in Heart field_)** & **(Save Favourites array in LocalStorage _with changes in Heart field_)**
5.  Function To change from  _Full Heart_ to _Empty Heart_  **(Get Recipes array from LocalStorage and then Save with changes in Heart field_)** & **(Get Favourites array from LocalStorage and then Save _with changes in Heart field_)**
6. When click in Fav Tab Switch To Favourites array 
7. Docheck to check changes in URL To Switch tabs
8. Search Function when click _emit value to BehaviorSubject_ and _Listen_ to it in this component 
9. Search API _by Ingrediant_
10. Pagination _client side_ (**not found** API with Pagination Server Side)
# Design
1. **InnerHTML** to view _HTML Summary_
2. **Slice Pipe** to view _sub from long Summary_



# Recipe Details
# Logic
1. _Routing with Id_ 
2. Get Selected Recipe from _Get API by ID_
3. Hide Search bar
# Design
1. **InnerHTML** to view _HTML Summary_ && _Instructions_


# Services 
1. Get Service for get operation 
2. Search Service for BehaviorSubject

