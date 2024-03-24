export const meme_phrases =
  "Bad Luck Brian,Grumpy Cat,Success Kid,Distracted Boyfriend,Drake Hotline Bling,Pepe the Frog,Doge,Mocking SpongeBob,That Escalated Quickly,This Is Fine,Salt Bae,Evil Kermit,Harambe,Cash Me Ousside,Arthur's Fist,Man's Not Hot,Hide the Pain Harold,Thanos Snap,Area 51 Raid,Baby Yoda,Karen memes,Big Brain Time,Bernie Sanders mittens,I Can Has Cheezburger?,Double Rainbow,Charlie Bit My Finger,Nyan Cat,Harlem Shake,Gangnam Style,Rickrolling,HODL,To the moon,Bitcoin rollercoaster,Buy the dip,Satoshi Nakamoto,Lambos with Bitcoin,Ethereum world computer,Crypto whale,Altcoin season,NFT craze,DeFi revolution,Shiba Inu coin,Bitcoin pizza day,When Lambo?,Not gonna make it (NGMI),Fear, Uncertainty, and Doubt (FUD),Weak hands,Diamond hands,Crypto kitties,Gas fees,What if I told you,Ain't nobody got time for that,Epic Fail,Leave Britney Alone,Why you no,Facepalm,I don’t always, but when I do,Here come dat boi,Is this a pigeon?,Two Buttons,Expanding Brain,No one:,Change My Mind,And it’s gone,Woman yelling at a cat,I'm gonna tell my kids,Dancing Pallbearers,How do you do, fellow kids?,Stonks,Everything is fine,Sad Keanu,It's over 9000!,Ceiling Cat,Forever Alone,The Most Interesting Man in the World,Epic Sax Guy,Ermahgerd,First World Problems,The Scroll of Truth,You know I had to do it to em,Disaster Girl,Confused Nick Young,Blinking White Guy,Press F to Pay Respects,Spider-Man Pointing at Spider-Man,I'm in this photo and I don't like it,Surprised Pikachu,Swole Doge vs. Cheems,I am once again asking,Oh no, anyway,Panik Kalm Panik,They don't know,Not a cell phone in sight,Look at this photograph,Ratatouille, the rat chef,It ain't much but it's honest work,The cake is a lie,Do you even lift, bro?,He protec, he attac,Me and the boys";

export const celebs =
  "Rihanna,Elon Musk,Mukesh Ambani,Donald Trump,Jeff Bezos,Oprah Winfrey,Kim Kardashian,Cristiano Ronaldo,Beyoncé,Vladimir Putin,Joe Biden,Bill Gates,Taylor Swift,Xi Jinping,Warren Buffett,LeBron James,Angela Merkel,Justin Bieber,Narendra Modi,Lady Gaga,Mark Zuckerberg,Serena Williams,Jay-Z,Tim Cook,J.K. Rowling,Emma Watson,Kanye West,Dwayne Johnson,Lionel Messi,Jack Ma,Prince Harry,Meghan Markle,Adele,Tom Brady,Greta Thunberg,Barack Obama,Michelle Obama,Jennifer Lopez,Michael Jordan,Kylie Jenner,Roger Federer,Sundar Pichai,Larry Page,Sergey Brin,Malala Yousafzai,Stephen Curry,Emma Stone,Ed Sheeran,Chris Hemsworth,Vladimir Putin,Xi Jinping,Angela Merkel,Narendra Modi,Justin Trudeau,Emmanuel Macron,Jair Bolsonaro,Boris Johnson,Recep Tayyip Erdoğan,Jacinda Ardern,Shinzo Abe,Volodymyr Zelensky,Pope Francis,Dalai Lama,Noam Chomsky,Satya Nadella,Sheryl Sandberg,Indra Nooyi,Elon Musk,Jeff Bezos,Mark Zuckerberg,Tim Cook,Sundar Pichai,Larry Page,Sergey Brin,Jack Dorsey,Masayoshi Son,Richard Branson,Warren Buffett,Jamie Dimon,Christine Lagarde,Ursula von der Leyen,Greta Thunberg,David Attenborough,Jane Goodall,Leonardo DiCaprio,Oprah Winfrey,Ellen DeGeneres,Jordan Peterson,Simon Sinek,Gary Vaynerchuk,Stephen King,J.K. Rowling,George R.R. Martin,E.L. James,Ken Follett,Dan Brown,John Green,Margaret Atwood,Chimamanda Ngozi Adichie,Yuval Noah Harari";

async function getRandomEntryFromCSV(content: string) {
  const records = content.split(",").map((item: any) => item.trim());

  const randomIndex = Math.floor(Math.random() * records.length);
  return records[randomIndex];
}

export async function suggestMemes() {
  const entry1 = await getRandomEntryFromCSV(meme_phrases);
  const entry2 = await getRandomEntryFromCSV(celebs);

  return [entry1, entry2];
}
