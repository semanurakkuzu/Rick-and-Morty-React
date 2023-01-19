export interface Character {
  id: String
  name: String
  status: String
  species: String
  type: String
  gender: String
  created: String
  url: String
  image: String
  episode: Array<String>
  location: {
    name: String
    url: String
  }
  origin: {
    name: String
    url: String
  }
}
