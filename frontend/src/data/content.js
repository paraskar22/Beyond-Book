import bookClubsImage from '../assets/images/book-clubs.jpeg';
import recommendationsImage from '../assets/images/recommendations.jpg';
import authorEngagementImage from '../assets/images/author-engagement.jpeg';
import bookMarketplaceImage from '../assets/images/book-marketplace.jpeg';
import classicLiteratureImage from '../assets/images/classic-literature.jpeg';
import sciFiImage from '../assets/images/sci-fi.jpeg';
import mysteryImage from '../assets/images/mystery-category.jpeg';
import poetryImage from '../assets/images/poetry.jpg';
import fictionImage from '../assets/images/fiction.jpeg';
import nonFictionImage from '../assets/images/non-fiction.jpeg';
import mysteryCategoryImage from '../assets/images/mystery-category.jpeg';
import sciFiCategoryImage from '../assets/images/sci-fi-category.jpeg';
import romanceImage from '../assets/images/romance.jpeg';
import biographyImage from '../assets/images/biography.png';
import midnightLibraryImage from '../assets/images/midnight-library.jpeg';
import projectHailMaryImage from '../assets/images/project-hail-mary.jpeg';
import sevenHusbandsImage from '../assets/images/seven-husbands.jpeg';
import atomicHabitsImage from '../assets/images/atomic-habits.jpeg';
import bookLaunchImage from '../assets/images/book-launch.jpeg';
import qaSessionImage from '../assets/images/qa-session.jpeg';
import writingWorkshopImage from '../assets/images/writing-workshop.jpeg';
import sarahJohnsonImage from '../assets/images/sarah-johnson.jpeg';
import michaelChenImage from '../assets/images/michael-chen.jpeg';
import emilyParkerImage from '../assets/images/emily-parker.jpeg';
import greatGatsbyImage from '../assets/images/great-gatsby.jpeg';
import mockingbirdImage from '../assets/images/mockingbird.jpeg';
import nineteenEightyFourImage from '../assets/images/1984.jpeg';
import hobbitImage from '../assets/images/hobbit.jpeg';
import userAvatarImage from '../assets/images/user-avatar.png';

// Home page content
export const homeContent = {
  hero: {
    title: "Welcome to Beyond the Book",
    subtitle: "Your ultimate destination for book lovers",
    description:
      "Join our community of readers, discover new books, and connect with fellow book enthusiasts.",
    primaryButton: "Get Started",
    secondaryButton: "Learn More",
    ctaButtons: [
      {
        text: "Get Started",
        link: "/auth/register",
        variant: "primary",
      },
      {
        text: "Learn More",
        link: "/features",
        variant: "secondary",
      },
    ],
  },
  features: [
    {
      id: 1,
      title: "Book Clubs",
      description:
        "Join or create book clubs to discuss your favorite reads with like-minded readers.",
      icon: "📚",
      image: bookClubsImage,
      link: "/book-clubs",
    },
    {
      id: 2,
      title: "Recommendations",
      description:
        "Get personalized book recommendations based on your reading history and preferences.",
      icon: "🎯",
      image: recommendationsImage,
      link: "/recommendations",
    },
    {
      id: 3,
      title: "Author Engagement",
      description:
        "Connect with authors through virtual events, Q&A sessions, and exclusive content.",
      icon: "✍️",
      image: authorEngagementImage,
      link: "/author-engagement",
    },
    {
      id: 4,
      title: "Book Marketplace",
      description:
        "Buy, sell, and exchange books with other members of the community.",
      icon: "🛍️",
      image: bookMarketplaceImage,
      link: "/marketplace",
    },
  ],
  stats: {
    members: "10,000+",
    books: "50,000+",
    clubs: "500+",
    events: "1,000+",
  },
  readingChallenges: {
    title: "Join Our Reading Challenges",
    description: "Participate in exciting reading challenges and earn badges",
    challenges: [
      {
        id: 1,
        title: "Summer Reading Challenge",
        books: 10,
        badge: "🌞",
      },
      {
        id: 2,
        title: "Classic Literature",
        books: 5,
        badge: "📚",
      },
      {
        id: 3,
        title: "Around the World",
        books: 7,
        badge: "🌍",
      },
    ],
  },
  upcomingEvents: {
    title: "Upcoming Events",
    description: "Join our virtual book discussions and author meetups",
    events: [
      {
        id: 1,
        title: "Book Club Discussion",
        date: "June 15, 2023",
        time: "7:00 PM EST",
        type: "Virtual",
        link: "/events/book-club-discussion",
      },
      {
        id: 2,
        title: "Author Q&A Session",
        date: "June 20, 2023",
        time: "8:00 PM EST",
        type: "Virtual",
        link: "/events/author-qa",
      },
    ],
  },
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Book Club Member",
      quote: "This platform has transformed my reading experience!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Author",
      quote: "Great way to connect with readers!",
      image: "https://i.pravatar.cc/150?img=2",
    },
  ],
  cta: {
    title: "Ready to Start Your Reading Journey?",
    description:
      "Join thousands of book lovers who have already discovered the joy of reading together.",
    button: {
      text: "Sign Up Now",
      link: "/auth/register"
    }
  },
};

// Book Clubs page content
export const bookClubsContent = {
  header: {
    title: "Book Clubs",
    description: "Join a community of readers or create your own book club.",
  },
  clubs: [
    {
      id: 1,
      name: "Classic Literature Enthusiasts",
      description: "A group dedicated to exploring timeless literary works.",
      members: 156,
      image: classicLiteratureImage,
      nextMeeting: "May 15, 2023",
      reading: "Pride and Prejudice by Jane Austen",
    },
    {
      id: 2,
      name: "Science Fiction Explorers",
      description:
        "Discover the wonders of science fiction and fantasy literature.",
      members: 203,
      image: sciFiImage,
      nextMeeting: "May 20, 2023",
      reading: "Dune by Frank Herbert",
    },
    {
      id: 3,
      name: "Mystery & Thriller Readers",
      description:
        "Uncover the best mysteries and thrillers in contemporary literature.",
      members: 178,
      image: mysteryImage,
      nextMeeting: "May 18, 2023",
      reading: "The Silent Patient by Alex Michaelides",
    },
    {
      id: 4,
      name: "Poetry Appreciation Society",
      description:
        "Celebrate the beauty of poetry through shared readings and discussions.",
      members: 92,
      image: poetryImage,
      nextMeeting: "May 22, 2023",
      reading: "The Sun and Her Flowers by Rupi Kaur",
    },
  ],
};

// Recommendations page content
export const recommendationsContent = {
  header: {
    title: "Book Recommendations",
    description:
      "Discover your next favorite book with our personalized recommendations.",
  },
  categories: [
    {
      id: 1,
      name: "Fiction",
      image: fictionImage,
    },
    {
      id: 2,
      name: "Non-Fiction",
      image: nonFictionImage,
    },
    {
      id: 3,
      name: "Mystery",
      image: mysteryCategoryImage,
    },
    {
      id: 4,
      name: "Science Fiction",
      image: sciFiCategoryImage,
    },
    {
      id: 5,
      name: "Romance",
      image: romanceImage,
    },
    {
      id: 6,
      name: "Biography",
      image: biographyImage,
    },
  ],
  recommendedBooks: [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.5,
      image: midnightLibraryImage,
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever.",
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      rating: 4.8,
      image: projectHailMaryImage,
      description:
        "A lone astronaut must save humanity from a catastrophic extinction event.",
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Historical Fiction",
      rating: 4.6,
      image: sevenHusbandsImage,
      description:
        "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.7,
      image: atomicHabitsImage,
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    },
  ],
};

// Author Engagement page content
export const authorEngagementContent = {
  header: {
    title: "Author Engagement",
    description:
      "Connect with your favorite authors through virtual events and exclusive content.",
  },
  upcomingEvents: [
    {
      id: 1,
      title: "Book Launch: The Last Chapter",
      author: "Sarah Johnson",
      date: "June 10, 2023",
      time: "7:00 PM EST",
      type: "Virtual Launch",
      image: bookLaunchImage,
      description:
        "Join us for the virtual launch of Sarah Johnson's latest novel, The Last Chapter.",
    },
    {
      id: 2,
      title: "Q&A Session with Mystery Writers",
      author: "Michael Chen, Lisa Rodriguez",
      date: "June 15, 2023",
      time: "8:00 PM EST",
      type: "Panel Discussion",
      image: qaSessionImage,
      description:
        "Join bestselling mystery authors Michael Chen and Lisa Rodriguez for an exclusive Q&A session.",
    },
    {
      id: 3,
      title: "Writing Workshop: Crafting Memorable Characters",
      author: "Emily Parker",
      date: "June 20, 2023",
      time: "6:00 PM EST",
      type: "Workshop",
      image: writingWorkshopImage,
      description:
        "Learn the art of creating memorable characters with award-winning author Emily Parker.",
    },
  ],
  featuredAuthors: [
    {
      id: 1,
      name: "Sarah Johnson",
      genre: "Literary Fiction",
      image: sarahJohnsonImage,
      bio: "Sarah Johnson is the author of five novels, including the bestselling 'The Silent Echo'.",
    },
    {
      id: 2,
      name: "Michael Chen",
      genre: "Mystery",
      image: michaelChenImage,
      bio: "Michael Chen has written over a dozen mystery novels and is known for his intricate plots.",
    },
    {
      id: 3,
      name: "Emily Parker",
      genre: "Contemporary Fiction",
      image: emilyParkerImage,
      bio: "Emily Parker's novels have been translated into 20 languages and have won numerous awards.",
    },
  ],
};

// Book Marketplace page content
export const bookMarketplaceContent = {
  header: {
    title: "Book Marketplace",
    description:
      "Buy, sell, and exchange books with other members of the community.",
  },
  listings: [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      condition: "Like New",
      price: "$8.99",
      seller: "BookLover123",
      location: "New York, NY",
      image: greatGatsbyImage,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      condition: "Good",
      price: "$6.50",
      seller: "ReaderForever",
      location: "Los Angeles, CA",
      image: mockingbirdImage,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      condition: "Very Good",
      price: "$7.25",
      seller: "Bookworm42",
      location: "Chicago, IL",
      image: nineteenEightyFourImage,
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      condition: "Excellent",
      price: "$9.99",
      seller: "FantasyFan",
      location: "Seattle, WA",
      image: hobbitImage,
    },
  ],
};

// User Profile page content
export const userProfileContent = {
  user: {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    memberSince: "January 2023",
    avatar: userAvatarImage,
  },
  readingStats: {
    booksRead: 42,
    currentlyReading: 3,
    wantToRead: 15,
    favoriteGenres: ["Science Fiction", "Mystery", "Historical Fiction"],
  },
  recentActivity: [
    {
      id: 1,
      type: "review",
      bookTitle: "The Midnight Library",
      author: "Matt Haig",
      date: "May 5, 2023",
      details: "Posted a 5-star review",
    },
    {
      id: 2,
      type: "club",
      bookTitle: "Classic Literature Enthusiasts",
      author: "N/A",
      date: "May 3, 2023",
      details: "Joined a new book club",
    },
    {
      id: 3,
      type: "reading",
      bookTitle: "Project Hail Mary",
      author: "Andy Weir",
      date: "May 1, 2023",
      details: "Started reading",
    },
    {
      id: 4,
      type: "purchase",
      bookTitle: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      date: "April 28, 2023",
      details: "Purchased from marketplace",
    },
  ],
};
