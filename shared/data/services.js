export const services = [
  {
    id: 'dog-walking',
    name: 'Dog walks',
    label: 'Daily',
    short: 'Midday walks and potty breaks, with photos and a walk report after every one.',
    body: 'Your dog gets a walk, a bathroom break, fresh water and some one-on-one attention. You get photos and a report with walk time, bathroom breaks and mood.',
    includes: ['Leashed walk around your neighborhood', 'Fresh water and treats', 'Photos and a walk report'],
    core: true,
  },
  {
    id: 'pet-visits',
    name: 'Drop-in pet visits',
    label: 'Drop-in',
    short: 'Feeding, medication, litter boxes and playtime for dogs, cats and small pets.',
    body: 'A sitter comes to your home to feed, give medication, clean litter boxes and play. It works well for cats and for dogs who are happiest at home.',
    includes: ['Meals and fresh water', 'Medication as directed', 'Litter box cleaning', 'Play and cuddles'],
    core: true,
  },
  {
    id: 'half-day',
    name: 'Half-day visits',
    label: 'Extended',
    short: 'Longer stays with extra play, walks and company.',
    body: 'Half-day visits give puppies, seniors and social pets extended play, walks and company, so they are not alone for long stretches.',
    includes: ['Several hours of company', 'Walks and play', 'Meals on your schedule'],
  },
  {
    id: 'standard-overnight',
    name: 'Standard overnight',
    label: '10 PM–6 AM',
    short: 'A sitter stays in your home for 8 straight hours overnight.',
    body: 'Your sitter stays in your home from 10 PM to 6 AM, so your pets are safe and never alone at night.',
    includes: ['Sitter in your home 10 PM–6 AM', 'Evening and morning potty breaks', 'Bedtime routine kept'],
    core: true,
  },
  {
    id: 'deluxe-overnight',
    name: 'Deluxe overnight',
    label: 'Overnight + 2 visits',
    short: 'Overnight care plus two midday drop-ins.',
    body: 'Your sitter arrives between 9 and 10 PM and leaves between 6 and 8 AM. Two midday visits, one between 11 AM and 1 PM and one between 4 and 6 PM, fill the gap during the day.',
    includes: ['Arrives 9–10 PM, leaves 6–8 AM', 'Visit between 11 AM and 1 PM', 'Visit between 4 and 6 PM'],
  },
  {
    id: 'live-in',
    name: 'Superior 24/7 care',
    label: 'Live-in',
    short: 'A dedicated sitter lives in your home for your whole trip.',
    body: 'A dedicated sitter stays in your home around the clock and keeps your pets on their normal walks, meals and routines, just as if you were home.',
    includes: ['Dedicated sitter in your home', 'Normal walks and routines', 'Daily photo updates'],
    core: true,
  },
  {
    id: 'pet-taxi',
    name: 'Pet taxi',
    label: 'Rides',
    short: 'Rides to the vet, the groomer or daycare.',
    body: 'We drive your pet to vet appointments, grooming or daycare and bring them home again, so you do not have to leave work.',
    includes: ['Vet appointments', 'Grooming', 'Daycare drop-off and pickup'],
  },
];

export const faqs = [
  {
    q: 'Are your sitters insured?',
    a: 'Yes. Sitters by the Sea is bonded and insured, and our sitters are trained in pet first aid.',
  },
  {
    q: 'What happens at the meet & greet?',
    a: 'Your sitter visits your home before the first booking to meet your pets, learn their routine and go over keys, feeding and any medication. There is no charge for it.',
  },
  {
    q: 'How do I book and pay?',
    a: 'Once you are set up, you book, change and pay for visits in the Time To Pet app or client portal.',
  },
  {
    q: 'Do you care for cats and other pets?',
    a: 'Yes. Drop-in visits and overnights cover cats and small pets as well as dogs.',
  },
  {
    q: 'Do you offer a military discount?',
    a: 'Yes. We offer 20% off all services for those who have served and those deploying.',
  },
];
