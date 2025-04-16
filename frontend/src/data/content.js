// Home page content
export const homeContent = {
  hero: {
    title: "Welcome to Beyond the Book",
    subtitle: "Your ultimate destination for book lovers",
    description:
      "Join our community of readers, discover new books, and connect with fellow book enthusiasts.",
    primaryButton: "Get Started",
    secondaryButton: "Learn More",
    backgroundImage: "/images/hero-bg.jpg",
  },
  features: [
    {
      id: 1,
      title: "Book Clubs",
      description:
        "Join or create book clubs to discuss your favorite reads with like-minded readers.",
      icon: "📚",
      image: "/images/book-clubs.jpg",
    },
    {
      id: 2,
      title: "Recommendations",
      description:
        "Get personalized book recommendations based on your reading history and preferences.",
      icon: "🎯",
      image: "/images/recommendations.jpg",
    },
    {
      id: 3,
      title: "Author Engagement",
      description:
        "Connect with authors through virtual events, Q&A sessions, and exclusive content.",
      icon: "✍️",
      image: "/images/author-engagement.jpg",
    },
    {
      id: 4,
      title: "Book Marketplace",
      description:
        "Buy, sell, and exchange books with other members of the community.",
      icon: "🛍️",
      image: "/images/book-marketplace.jpg",
    },
  ],
  cta: {
    title: "Ready to Start Your Reading Journey?",
    description:
      "Join thousands of book lovers who have already discovered the joy of reading together.",
    button: "Sign Up Now",
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
      image: "/images/classic-literature.jpg",
      nextMeeting: "May 15, 2023",
      reading: "Pride and Prejudice by Jane Austen",
    },
    {
      id: 2,
      name: "Science Fiction Explorers",
      description:
        "Discover the wonders of science fiction and fantasy literature.",
      members: 203,
      image: "/images/sci-fi.jpg",
      nextMeeting: "May 20, 2023",
      reading: "Dune by Frank Herbert",
    },
    {
      id: 3,
      name: "Mystery & Thriller Readers",
      description:
        "Uncover the best mysteries and thrillers in contemporary literature.",
      members: 178,
      image: "/images/mystery.jpg",
      nextMeeting: "May 18, 2023",
      reading: "The Silent Patient by Alex Michaelides",
    },
    {
      id: 4,
      name: "Poetry Appreciation Society",
      description:
        "Celebrate the beauty of poetry through shared readings and discussions.",
      members: 92,
      image: "/images/poetry.jpg",
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
      image: "/images/fiction.jpg",
    },
    {
      id: 2,
      name: "Non-Fiction",
      image: "/images/non-fiction.jpg",
    },
    {
      id: 3,
      name: "Mystery",
      image: "/images/mystery-category.jpg",
    },
    {
      id: 4,
      name: "Science Fiction",
      image: "/images/sci-fi-category.jpg",
    },
    {
      id: 5,
      name: "Romance",
      image: "/images/romance.jpg",
    },
    {
      id: 6,
      name: "Biography",
      image: "/images/biography.jpg",
    },
  ],
  recommendedBooks: [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.5,
      image: "/images/midnight-library.jpg",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever.",
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      rating: 4.8,
      image: "/images/project-hail-mary.jpg",
      description:
        "A lone astronaut must save humanity from a catastrophic extinction event.",
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Historical Fiction",
      rating: 4.6,
      image: "/images/seven-husbands.jpg",
      description:
        "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.7,
      image: "/images/atomic-habits.jpg",
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
      image: "/images/book-launch.jpg",
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
      image: "/images/qa-session.jpg",
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
      image: "/images/writing-workshop.jpg",
      description:
        "Learn the art of creating memorable characters with award-winning author Emily Parker.",
    },
  ],
  featuredAuthors: [
    {
      id: 1,
      name: "Sarah Johnson",
      genre: "Literary Fiction",
      image: "/images/sarah-johnson.jpg",
      bio: "Sarah Johnson is the author of five novels, including the bestselling 'The Silent Echo'.",
    },
    {
      id: 2,
      name: "Michael Chen",
      genre: "Mystery",
      image: "/images/michael-chen.jpg",
      bio: "Michael Chen has written over a dozen mystery novels and is known for his intricate plots.",
    },
    {
      id: 3,
      name: "Emily Parker",
      genre: "Contemporary Fiction",
      image: "/images/emily-parker.jpg",
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
      image: "/images/great-gatsby.jpg",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      condition: "Good",
      price: "$6.50",
      seller: "ReaderForever",
      location: "Los Angeles, CA",
      image: "/images/mockingbird.jpg",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      condition: "Very Good",
      price: "$7.25",
      seller: "Bookworm42",
      location: "Chicago, IL",
      image: "/images/1984.jpg",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      condition: "Excellent",
      price: "$9.99",
      seller: "FantasyFan",
      location: "Seattle, WA",
      image: "/images/hobbit.jpg",
    },
  ],
};

// User Profile page content
export const userProfileContent = {
  user: {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    memberSince: "January 2023",
    avatar: "/images/user-avatar.jpg",
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
