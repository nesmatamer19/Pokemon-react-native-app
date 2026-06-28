import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View, Text } from "react-native";

interface PokemonDetails {
  base_experience: number;
  weight: number;
  image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
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

export default function Details() {
  const { name } = useLocalSearchParams();

  const [singlePoke, setsinglePoke] = useState<PokemonDetails>();
  console.log(singlePoke);
  useEffect(() => {
    fetchPokemonByName(name.toString());
  }, [name]);

  async function fetchPokemonByName(name: string) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();

      const pokemonData = {
        base_experience: data.base_experience,
        weight: data.weight,
        image: data.sprites.front_default,
        types: data.types,
      };
      console.log(pokemonData);
      setsinglePoke(pokemonData);
    } catch (e) {}
  }

  return (
    <>
    <Stack.Screen options={{title: name.toString(), headerShown: true}}/>
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <View
        style={{
          //@ts-ignore
          backgroundColor: colorsByType[singlePoke?.types[0].type.name] + 50,
          flexDirection: "column" , borderRadius:20,
        }}
      >
        <Image
          source={{ uri: singlePoke?.image }}
          style={{ height: 300, justifyContent: "center" }}
          />
      </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>
            <Text style={{color: "#705898"}}> Weight: </Text>
            {singlePoke?.weight}</Text>
    </ScrollView>
    </>
  );
}
