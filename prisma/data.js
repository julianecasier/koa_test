const { Prisma } = require('@prisma/client');
const tasks = [
  {
    title: 'Maquettes',
    content: 'Version 1 des maquettes',
    userName: 'Jonh Mainwaring',
    
    date: '11 décembre 2023',
  },
  {
    title: 'Réunion',
    content: 'Réunion de lancement',
    userName: 'Mary Gibson',
    date: '3 février 2023',
  
  },
  {
    title: "Réunion d'équipe",
    content: 'Réunion de lancement',
    userName: 'Juliane Casier',
    date: '2 octobre 2022',
   
  },
  {
    title: 'Team builing',
    content: 'Campagne dans les bois',
    userName: 'Juliane Casier',
    date: '',
    
  },
  {
    title: 'POC',
    content: '',
    userName: 'Juliane Casier',
    date: '',
  
  },
];
const users = [
  {
    name: 'Jonh Mainwaring',
    email: 'jonh@mail.com',
    image:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--t_1jSOOB--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/58970/9f7afe42-af56-47ee-bda6-9a1cf0964e36.jpg',
  },
  {
    name: 'Mary Gibson',
    email: 'marie@mail.com',
    image:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--t_1jSOOB--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/58970/9f7afe42-af56-47ee-bda6-9a1cf0964e36.jpg',
  },
];

module.exports = {
  tasks,
  users,
};
