const products = [
  {
    id: 1,
    name: 'Organic Argan Oil',
    price: 24.99,
    image: 'https://i.pinimg.com/736x/17/7b/04/177b04f0e56d09345ea0a1c68aafad95.jpg',
    vendorName: 'Argan Cooperative',
    category: 'Cosmetics',
    rating: 4.8,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/17/7b/04/177b04f0e56d09345ea0a1c68aafad95.jpg',
      'https://i.pinimg.com/736x/17/7b/04/177b04f0e56d09345ea0a1c68aafad95.jpg',
      'https://i.pinimg.com/736x/17/7b/04/177b04f0e56d09345ea0a1c68aafad95.jpg'
    ]
  },
  {
    id: 2,
    name: 'Natural Honey',
    price: 18.99,
    discountPrice: 15.99,
    image: 'https://i.pinimg.com/736x/1f/e2/ca/1fe2ca7b530207bec25c16445ffed1db.jpg',
    vendorName: 'Honey Artisans',
    category: 'Honey & Bee Products',
    rating: 4.9,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/1f/e2/ca/1fe2ca7b530207bec25c16445ffed1db.jpg',
      'https://i.pinimg.com/736x/1f/e2/ca/1fe2ca7b530207bec25c16445ffed1db.jpg',
      'https://i.pinimg.com/736x/1f/e2/ca/1fe2ca7b530207bec25c16445ffed1db.jpg'
    ]
  },
  {
    id: 3,
    name: 'Moroccan Saffron',
    price: 29.99,
    image: 'https://i.pinimg.com/736x/48/80/99/488099a780fea9b89fd3fe59153916a7.jpg',
    vendorName: 'Spice Farmers',
    category: 'Food',
    rating: 4.7,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/48/80/99/488099a780fea9b89fd3fe59153916a7.jpg',
      'https://i.pinimg.com/736x/48/80/99/488099a780fea9b89fd3fe59153916a7.jpg',
      'https://i.pinimg.com/736x/48/80/99/488099a780fea9b89fd3fe59153916a7.jpg'
    ]
  },
  {
    id: 4,
    name: 'Natural Rose Water',
    price: 12.99,
    image: 'https://i.pinimg.com/736x/fd/d7/22/fdd72259a870146e0e2c1f88381dd6ba.jpg',
    vendorName: 'Rose Valley Coop',
    category: 'Cosmetics',
    rating: 4.6,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/fd/d7/22/fdd72259a870146e0e2c1f88381dd6ba.jpg',
      'https://i.pinimg.com/736x/fd/d7/22/fdd72259a870146e0e2c1f88381dd6ba.jpg',
      'https://i.pinimg.com/736x/fd/d7/22/fdd72259a870146e0e2c1f88381dd6ba.jpg'
    ]
  },
  {
    id: 5,
    name: 'Organic Olive Oil',
    price: 19.99,
    image: 'https://i.pinimg.com/736x/21/1b/12/211b123b761e488c6c7def2af039ca47.jpg',
    vendorName: 'Olive Grove Cooperative',
    category: 'Food',
    rating: 4.8,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/21/1b/12/211b123b761e488c6c7def2af039ca47.jpg',
      'https://i.pinimg.com/736x/21/1b/12/211b123b761e488c6c7def2af039ca47.jpg',
      'https://i.pinimg.com/736x/21/1b/12/211b123b761e488c6c7def2af039ca47.jpg'
    ]
  },
  {
    id: 6,
    name: 'Moroccan Black Soap',
    price: 14.99,
    image: 'https://i.pinimg.com/736x/dc/40/d3/dc40d35d6a223e652b582fa77ef7f68f.jpg',
    vendorName: 'Traditional Soaps',
    category: 'Cosmetics',
    rating: 4.7,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/dc/40/d3/dc40d35d6a223e652b582fa77ef7f68f.jpg',
      'https://i.pinimg.com/736x/dc/40/d3/dc40d35d6a223e652b582fa77ef7f68f.jpg',
      'https://i.pinimg.com/736x/dc/40/d3/dc40d35d6a223e652b582fa77ef7f68f.jpg'
    ]
  },
  {
    id: 7,
    name: 'Atlas Mountains Herbs',
    price: 9.99,
    image: 'https://i.pinimg.com/736x/8d/2d/6c/8d2d6c10ce1e26f7fef63cb3871f7a55.jpg',
    vendorName: 'Mountain Herb Collective',
    category: 'Spices',
    rating: 4.5,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/8d/2d/6c/8d2d6c10ce1e26f7fef63cb3871f7a55.jpg',
      'https://i.pinimg.com/736x/8d/2d/6c/8d2d6c10ce1e26f7fef63cb3871f7a55.jpg',
      'https://i.pinimg.com/736x/8d/2d/6c/8d2d6c10ce1e26f7fef63cb3871f7a55.jpg'
    ]

  },
  {
    id: 8,
    name: 'Prickly Pear Oil',
    price: 34.99,
    discountPrice: 29.99,
    image: 'https://i.pinimg.com/736x/06/b3/c9/06b3c918dbe62f6127586a366578f33a.jpg',
    vendorName: 'Desert Products Co-op',
    category: 'Cosmetics',
    rating: 4.9,
    stockCount: 45,
    sizes: ['50ml', '100ml', '250ml'],
    images: [
      'https://i.pinimg.com/736x/06/b3/c9/06b3c918dbe62f6127586a366578f33a.jpg',
      'https://i.pinimg.com/736x/06/b3/c9/06b3c918dbe62f6127586a366578f33a.jpg',
      'https://i.pinimg.com/736x/06/b3/c9/06b3c918dbe62f6127586a366578f33a.jpg'
    ]
  }
];

export default products;