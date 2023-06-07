import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strInstructions: string;
  strDrinkThumb: string;
}

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
  cocktails: Cocktail[] = []; // Arreglo que almacenará los cócteles buscados
  randomCocktails: Cocktail[] = []; // Arreglo que almacenará los cócteles aleatorios
  searchTerm = ''; // Término de búsqueda

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCocktails(); // Cargar los cócteles aleatorios al iniciar el componente
  }

  loadCocktails() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/randomselection.php';

    this.http.get<any>(url).subscribe(data => {
      this.randomCocktails = data.drinks; // Asignar los cócteles aleatorios obtenidos de la API al arreglo
      console.log('Random Cocktails:', this.randomCocktails); // Agrega este console.log para verificar los datos obtenidos
    });
  }

  /**
   * Obtiene la URL del cóctel según su identificador.
   * @param cocktailId El identificador del cóctel.
   * @returns La URL del cóctel.
   */
  getCocktailUrl(cocktailId: string) {
    return 'https://www.thecocktaildb.com/drink/' + cocktailId;
  }

  /**
   * Obtiene la URL de la miniatura del cóctel según su URL original.
   * @param thumbnailUrl La URL original de la imagen.
   * @returns La URL de la miniatura del cóctel.
   */
  getCocktailThumbnail(thumbnailUrl: string) {
    return thumbnailUrl + '/preview';
  }

  /**
   * Realiza la búsqueda de cócteles según el término de búsqueda.
   */
  searchCocktails() {
    if (this.searchTerm) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.searchTerm}`;

      this.http.get<any>(url).subscribe(data => {
        this.cocktails = data.drinks; // Asignar los cócteles obtenidos de la búsqueda al arreglo
        console.log('Searched Cocktails:', this.cocktails); // Agrega este console.log para verificar los datos obtenidos
      });
    } else {
      this.loadCocktails(); // Si no hay término de búsqueda, cargar los cócteles aleatorios
    }
  }
}
