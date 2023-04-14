import { post, get } from "./http/http.client"

export async function createObituary(
  name,
  birthDate,
  deathDate,
  imageRef,
  obituaryText
) {
  const url =
    "https://f2czaxpf62jyctbg5bzwwc6rvy0zalch.lambda-url.ap-south-1.on.aws"
  const request = {
    name: name,
    birth_date: birthDate,
    death_date: deathDate,
    imageRef:
      "https://i.etsystatic.com/31309176/r/il/d0f1dd/3470296538/il_570xN.3470296538_o99j.jpg",
    obituaryText: "CHATGPT generated text Placeholder",
  }

  console.log("posting..", request)
  const response = await post(url, request)
  return response.body
}

export async function getAll() {

    const url = "https://uuxu2q3zofwueysqqof5lrkhxm0commm.lambda-url.ap-south-1.on.aws"

    const response = await get(url)
    return response.body
}
