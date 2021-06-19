import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import req from "petitio"
import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const page = ({ json }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(json)
  return(
    <Jumbotron>
      <h1>Hello, there!</h1>
      <p>
        This page hasnt quite been developed quite yet, please come back later!
      </p>
    </Jumbotron>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let token;
  if(query.token !== undefined) {
    token = query.token
  }
  const request = await req(`https://hastebin.com/raw/${token}`)
    .send()

  if(request.statusCode !== 200) {
    // return {
    //   notFound: true
    // }
  }

  const data = request.json<Props>()

  console.log(data)

  return{
    props: {
      json: data
    }
  }
}

export default page

type Props = {
  sets: Array<set>,
  tiers: Array<tier>
}

interface tier {
  name: String,
  display: String,
  "requires-tiers": Array<String>,
  "crystal-craftable": boolean,
  "crystal-name": String,
  "crystal-recipe": Array<String>,
  "recipe-give-amount": number,
  "crystal-lore": Array<String>,
  properties: {
    helmet: property,
    chestplate: property,
    elytra: property,
    leggings: property,
    boots: property,
  }
}

interface set {
  name: string,
  conditions: Array<argument>,
  effects: Array<argument>,
  "advanced-effects": Array<argument>,
  "potion-effects": Array<argument>,
  "advanced-lore": Array<String>,
  "advancement-shard-name": String,
  "advancement-shard-lore": Array<String>,
  "shard-craftable": boolean,
  "shard-recipe": Array<String>,
  helmet: armorPiece,
  chestplate: armorPiece,
  elytra: armorPiece,
  leggings: armorPiece,
  boots: armorPiece,
}

interface property {
  armor: number,
  toughness: number,
  "knockback-resistance": number,
  "speed-percentage": number,
  "attack-speed-percentage": number,
  "attack-damage-percentage": number,
  "attack-knockback-percentage": number
}

interface armorPiece {
  enchants: Array<argument>,
  material: String,
  "skull-texture"?: String,
  "leather-color"?: String,
  name: string,
  "advanced-name": String,
  "effective-durability": number,
  unbreakable: boolean,
  flags: Array<String>,
  "custom-model-data": number,
  lore: Array<String>,
  craftable: boolean,
  "default-tier": String,
  recipe: Array<String>
}

interface argument {
  id?: string,
  args?: number
}
