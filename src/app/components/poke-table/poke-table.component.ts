import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent {

  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons= [];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private pokeService: PokemonService, private router: Router){}

  ngOnInit(): void{
    this.getPokemons();
  }

  getPokemons(){
    let pokemonData;
    let capitalizedName;

    for(let i =1; i<150; i++){
      this.pokeService.getPokemons(i).subscribe(
        res => {
          capitalizedName = res.name.charAt(0).toUpperCase() + res.name.slice(1);
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: capitalizedName
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err=> {
          console.log(err);
        }
      )
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any){
    this.router.navigateByUrl(`poke-detail/${row.position}`);
  }
}
