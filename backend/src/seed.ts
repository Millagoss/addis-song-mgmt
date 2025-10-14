import { connectDB } from "./config/db";
import { Song } from "./models/Song";

async function seed() {
  await connectDB();
  await Song.deleteMany({});

  const samples = [
    { title: "Shape of You", artist: "Ed Sheeran", album: "Divide", genre: "Pop" },
    { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "R&B" },
    { title: "Lose Yourself", artist: "Eminem", album: "8 Mile", genre: "Hip-Hop" },
    { title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", genre: "Pop" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", genre: "Rock" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", album: "X", genre: "Pop" },
    { title: "Starboy", artist: "The Weeknd", album: "Starboy", genre: "R&B" },
    { title: "HUMBLE.", artist: "Kendrick Lamar", album: "DAMN.", genre: "Hip-Hop" },
    { title: "Come As You Are", artist: "Nirvana", album: "Nevermind", genre: "Rock" },
    { title: "Beat It", artist: "Michael Jackson", album: "Thriller", genre: "Pop" },
    { title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?", genre: "Pop" },
    { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop" },
    { title: "Thunderstruck", artist: "AC/DC", album: "The Razors Edge", genre: "Rock" },
    { title: "Numb", artist: "Linkin Park", album: "Meteora", genre: "Rock" },
    { title: "Hey Ya!", artist: "Outkast", album: "Speakerboxxx/The Love Below", genre: "Hip-Hop" },
    { title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", genre: "R&B" },
    { title: "Perfect", artist: "Ed Sheeran", album: "Divide", genre: "Pop" },
    { title: "Rockstar", artist: "Post Malone", album: "Beerbongs & Bentleys", genre: "Hip-Hop" },
    { title: "Billie Bossa Nova", artist: "Billie Eilish", album: "Happier Than Ever", genre: "Pop" },
    { title: "All of the Lights", artist: "Kanye West", album: "My Beautiful Dark Twisted Fantasy", genre: "Hip-Hop" }
  ];

  await Song.insertMany(samples);
  console.log(`Seeded ${samples.length} songs`);
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
