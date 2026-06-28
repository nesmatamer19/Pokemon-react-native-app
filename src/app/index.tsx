import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View , StyleSheet, Pressable} from "react-native";

interface Pokemon {
  name: string;
  image: string;
  backImage: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: Record<string, string> = {
  grass: "#48d1b1",
  fire: "#fb6c6c",
  water: "#76bdfe",
  bug: "#a8b820",
  normal: "#a8a878",
  poison: "#a040a0",
  electric: "#ffd86f",
  ground: "#e0c068",
  fairy: "#ee99ac",
  fighting: "#c03028",
  psychic: "#f85888",
  rock: "#b8a038",
  ghost: "#705898",
  ice: "#98d8d8",
  dragon: "#7038f8",
  dark: "#705746",
  steel: "#b8b8d0",
  flying: "#a890f0",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await res.json();
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          return {
            name: pokemon.name,
            image: data.sprites.front_default,
            backImage: data.sprites.back_default,
            types: data.types,
          };
        }),
      );
      setPokemons(detailedPokemon);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <ScrollView
    contentContainerStyle={{
      gap: 16,
      padding: 16
    }}
    >
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name} 
        href={{pathname: "/details", params: {name: pokemon.name}}}
        style={{
          //@ts-ignore
          backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
          padding: 20,
          borderRadius: 20

        }}>
        <View>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: pokemon.backImage }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center'
  }
})
