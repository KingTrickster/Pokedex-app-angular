import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent {

  constructor(private pokeService: PokemonService){}

  ngOnInit(): void{
    this.getPokemons();
  }

  getPokemons(){
    this.pokeService.getPokemons().subscribe(
      res => {
        console.log(res);
      },
      err=> {

      }
    )
  }
}
