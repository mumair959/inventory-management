<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard')->middleware(['auth']);

Auth::routes();

Route::get('/', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
Route::get('/get-dashboard-data', [App\Http\Controllers\DashboardController::class, 'getDashboardData'])->name('get-dashboard-data');


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/get-users-list', [App\Http\Controllers\UserController::class, 'getList'])->name('get_users_list');

Route::get('/item-variations', [App\Http\Controllers\ItemVariationController::class, 'index'])->name('item_variations');
Route::get('/get-all-item-variations', [App\Http\Controllers\ItemVariationController::class, 'getAll'])->name('get_all_item_variations');
Route::get('/get-item-variation-details', [App\Http\Controllers\ItemVariationController::class, 'get'])->name('get_item_variation_details');
Route::get('/get-item-variations-list', [App\Http\Controllers\ItemVariationController::class, 'getList'])->name('get_item_variations_list');
Route::post('/create-item-variation', [App\Http\Controllers\ItemVariationController::class, 'create'])->name('create_item_variation');
Route::post('/delete-item-variation', [App\Http\Controllers\ItemVariationController::class, 'delete'])->name('delete_item_variation');
Route::post('/update-item-variation', [App\Http\Controllers\ItemVariationController::class, 'update'])->name('update_item_variation');

Route::get('/item-moifiers', [App\Http\Controllers\ItemModifierController::class, 'index'])->name('item_modifiers');
Route::get('/get-all-item-modifiers', [App\Http\Controllers\ItemModifierController::class, 'getAll'])->name('get_all_item_modifiers');
Route::get('/get-item-modifier-details', [App\Http\Controllers\ItemModifierController::class, 'get'])->name('get_item_modifier_details');
Route::post('/create-item-modifier', [App\Http\Controllers\ItemModifierController::class, 'create'])->name('create_item_modifier');
Route::post('/delete-item-modifier', [App\Http\Controllers\ItemModifierController::class, 'delete'])->name('delete_item_modifier');
Route::post('/update-item-modifier', [App\Http\Controllers\ItemModifierController::class, 'update'])->name('update_item_modifier');

Route::get('/items', [App\Http\Controllers\ItemController::class, 'index'])->name('items');
Route::get('/get-all-items', [App\Http\Controllers\ItemController::class, 'getAll'])->name('get_all_items');
Route::get('/get-item-details', [App\Http\Controllers\ItemController::class, 'get'])->name('get_item_details');
Route::get('/get-items-list', [App\Http\Controllers\ItemController::class, 'getList'])->name('get_items_list');
Route::post('/create-item', [App\Http\Controllers\ItemController::class, 'create'])->name('create_item');
Route::post('/delete-item', [App\Http\Controllers\ItemController::class, 'delete'])->name('delete_item');
Route::post('/update-item', [App\Http\Controllers\ItemController::class, 'update'])->name('update_item');

Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index'])->name('categories');
Route::get('/get-all-categories', [App\Http\Controllers\CategoryController::class, 'getAll'])->name('get_all_categories');
Route::get('/get-category-details', [App\Http\Controllers\CategoryController::class, 'get'])->name('get_category_details');
Route::get('/get-categories-list', [App\Http\Controllers\CategoryController::class, 'getList'])->name('get_categories_list');
Route::post('/create-category', [App\Http\Controllers\CategoryController::class, 'create'])->name('create_category');
Route::post('/delete-category', [App\Http\Controllers\CategoryController::class, 'delete'])->name('delete_category');
Route::post('/update-category', [App\Http\Controllers\CategoryController::class, 'update'])->name('update_category');

Route::get('/units', [App\Http\Controllers\UnitController::class, 'index'])->name('units');
Route::get('/get-all-units', [App\Http\Controllers\UnitController::class, 'getAll'])->name('get_all_units');
Route::get('/get-unit-details', [App\Http\Controllers\UnitController::class, 'get'])->name('get_unit_details');
Route::get('/get-units-list', [App\Http\Controllers\UnitController::class, 'getList'])->name('get_units_list');
Route::post('/create-unit', [App\Http\Controllers\UnitController::class, 'create'])->name('create_unit');
Route::post('/delete-unit', [App\Http\Controllers\UnitController::class, 'delete'])->name('delete_unit');
Route::post('/update-unit', [App\Http\Controllers\UnitController::class, 'update'])->name('update_unit');

Route::get('/recipes', [App\Http\Controllers\RecipeController::class, 'index'])->name('recipes');
Route::get('/get-all-recipes', [App\Http\Controllers\RecipeController::class, 'getAll'])->name('get_all_recipes');
Route::get('/get-recipe-details', [App\Http\Controllers\RecipeController::class, 'get'])->name('get_recipe_details');
Route::post('/create-recipe', [App\Http\Controllers\RecipeController::class, 'create'])->name('create_recipe');
Route::post('/delete-recipe', [App\Http\Controllers\RecipeController::class, 'delete'])->name('delete_recipe');
Route::post('/update-recipe', [App\Http\Controllers\RecipeController::class, 'update'])->name('update_recipe');