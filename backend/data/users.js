import bcrypt from "bcryptjs";

const users = [
  {
    name: "Kaung Kaung",
    email: "bytehubatr@gmail.com",
    password: bcrypt.hashSync("kaungkaung123@@"),
    isAdmin: true,
  },
  {
    name: "Kyaw Gyi",
    email: "kyawgyi@gmail.com",
    password: bcrypt.hashSync("#kyawgyi100phoe"),
    isAdmin: false,
  },
  {
    name: "Ko Khant",
    email: "paungmoke2lone@gmail.com",
    password: bcrypt.hashSync("kah2@ngmoo"),
    isAdmin: false,
  },
];

export default users;