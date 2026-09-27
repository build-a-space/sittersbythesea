// Facts about the business. Items marked TODO need confirming by the owner.

export const business = {
  name: 'Sitters by the Sea',
  tagline: 'Sit. Stay. Go. Play.',
  founded: 2019,
  owner: 'Joee Russo-Duffy',
  email: 'info@sittersbythesea.net',
  phone: '(757) 348-0411',
  phoneHref: '+17573480411',
  facebook: 'https://www.facebook.com/sittersbytheseavb/',
  yelp: 'https://www.yelp.com/biz/sitters-by-the-sea-virginia-beach',
  nextdoor: 'https://nextdoor.com/pages/sitters-by-the-sea-virginia-beach-va/',
  googleReviews: 'https://www.google.com/maps/search/?api=1&query=Sitters+by+the+Sea+Virginia+Beach',
  // TODO: replace with the real Time To Pet portal link.
  timeToPet: null,
  militaryDiscount: '20% off all services for those who have served and those deploying.',
  officeHours: 'Mon–Sat 9 AM–6 PM · Sunday closed',
  sittingHours: '7 days a week, 7 AM–8 PM',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' },
  ],
  credentials: ['Bonded', 'Insured', 'Pet first aid trained'],
  memberships: [
    { name: 'National Association of Professional Pet Sitters', short: 'NAPPS member' },
    { name: 'Pet Sitters International', short: 'PSI member' },
  ],
  awards: [
    { title: 'Nextdoor Neighborhood Fave', detail: '2021, 2022 & 2023' },
    {
      title: 'Coastal Virginia Magazine',
      detail: 'Nominated for Best Pet Sitting Business on the Southside, 2021–2023',
      image: '/images/badges/coastal-virginia-magazine.png',
    },
  ],
};

export const steps = [
  { title: 'Fill out the onboarding form', body: 'Tell us about your pets, your home and the care you need. It takes about ten minutes.' },
  { title: 'Meet your sitter', body: 'We come to your home for a free meet & greet, so your pets and your sitter get to know each other.' },
  { title: 'Schedule your care', body: 'Book walks, visits and overnights in the Time To Pet app, and change them there any time.' },
  { title: 'Enjoy peace of mind', body: 'After every visit you get photos and a report: walk time, bathroom breaks, food, water and mood.' },
];

export const reviews = [
  {
    name: 'Heidi M.',
    place: 'Virginia Beach, VA',
    text: 'Joee is an animal lover and a great businesswoman. She spent lots of time with my dogs and cat and sent detailed reports with pictures. I think they had more fun with her than they do with me. She allowed us to go out of town and not worry about our pets. The dogs and cat were healthy, happy, and unstressed when we got home.',
  },
  {
    name: 'Mike J.',
    place: 'Virginia Beach, VA',
    text: "The service was great and pics and updates made us feel at ease with our 2 pups they were baby sitting. Someone stayed overnight and someone walked them during the day and couldn't have been better. Will definitely use them for our pups in the future!",
  },
  {
    name: 'Joe K.',
    place: 'Virginia Beach, VA',
    text: 'We are so happy to have found Joee, she helped make our vacation a blast. Not having to worry about being home to let Dudley out allowed us flexibility to fully explore the area. I highly recommend her services for vacation renters and residents.',
  },
];

// Example walk report shown in heroes. It illustrates the report format.
export const sampleReport = {
  pet: 'Bear',
  day: 'Tue',
  time: '6:42 AM',
  place: 'Sunrise walk',
  minutes: 32,
  miles: 1.4,
  mood: 'Happy',
  checks: ['Pee', 'Poop', 'Fresh water', 'Breakfast', 'Paws rinsed'],
  note: 'Bear chased the waves and said hi to every dog on the beach.',
  photo: '/images/photos/dog-beach-sunset.jpg',
};
