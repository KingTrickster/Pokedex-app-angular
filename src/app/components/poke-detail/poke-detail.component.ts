import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent {
  pokemon: any = '';
  pokemonType = [];
  pokemonImage = '';


  constructor(private pokeService: PokemonService, private activatedRouter: ActivatedRoute){
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )

  }

  getPokemon(id: number){
    this.pokeService.getPokemons(id).subscribe(
      res=> {
        this.pokemon = res;
        this.pokemonImage = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
      },
      err=> {

      }
    );
  }
}
