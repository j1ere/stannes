"use client"


import { notFound, useParams } from "next/navigation";
import Link from "next/link";

const readingsData = {
  "first-reading": {
    title: "First Reading",
    reference: "1 John 3:22–4:6",
    fullText: `Beloved:  
We receive from him whatever we ask, because we keep his commandments and do what pleases him. And his commandment is this: we should believe in the name of his Son, Jesus Christ, and love one another just as he commanded us. Those who keep his commandments remain in him, and he in them, and the way we know that he remains in us is from the Spirit whom he gave us.  

Beloved, do not trust every spirit but test the spirits to see whether they belong to God, because many false prophets have gone out into the world. This is how you can know the Spirit of God: every spirit that acknowledges Jesus Christ come in the flesh belongs to God, and every spirit that does not acknowledge Jesus does not belong to God. This is the spirit of the antichrist who, as you heard, is to come, but in fact is already in the world. You belong to God, children, and you have conquered them, for the one who is in you is greater than the one who is in the world. They belong to the world; accordingly, their teaching belongs to the world, and the world listens to them. We belong to God, and anyone who knows God listens to us, while anyone who does not belong to God refuses to hear us. This is how we know the spirit of truth and the spirit of deceit.  

The word of the Lord.`,
  },
  // Add psalm and gospel similarly
  psalm: {
    title: "Responsorial Psalm",
    reference: "Psalm 2:7bc-8, 10-12a",
    fullText: `R. (8ab) I will give you all the nations for an inheritance.  
The LORD said to me, “you are my Son; this day I have begotten you. Ask of me and I will give you the nations for an inheritance and the ends of the earth for your possession.”  
R. I will give you all the nations for an inheritance.  

And now, O kings, give heed; take warning, you rulers of the earth. Serve the LORD with fear, and rejoice before him; with trembling rejoice.  
R. I will give you all the nations for an inheritance.`,
  },
  gospel: {
    title: "Gospel",
    reference: "Matthew 4:12-17, 23-25",
    fullText: `When Jesus heard that John had been arrested, he withdrew to Galilee. He left Nazareth and went to live in Capernaum by the sea, in the region of Zebulun and Naphtali, that what had been said through Isaiah the prophet might be fulfilled:  

Land of Zebulun and land of Naphtali, the way to the sea, beyond the Jordan, Galilee of the Gentiles, the people who sit in darkness have seen a great light, on those dwelling in a land overshadowed by death light has arisen.  

From that time on, Jesus began to preach and say, “Repent, for the Kingdom of heaven is at hand.”  

He went around all of Galilee, teaching in their synagogues, proclaiming the Gospel of the Kingdom, and curing every disease and illness among the people. His fame spread to all of Syria, and they brought to him all who were sick with various diseases and racked with pain, those who were possessed, lunatics, and paralytics, and he cured them. And great crowds from Galilee, the Decapolis, Jerusalem, and Judea, and from beyond the Jordan followed him.  

The Gospel of the Lord.`,
  },
}

interface Props {
  params: { type: string }
}

export default function ReadingPage() {
  const params = useParams();
  const type = params.type as keyof typeof readingsData;

  const reading = readingsData[type];

  if (!reading) {
    notFound();
  }

  
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/prayer" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          ← Back to Prayer
        </Link>
        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{reading.title}</h1>
            <p className="text-2xl font-semibold text-green-600">{reading.reference}</p>
          </header>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-xl leading-relaxed whitespace-pre-line text-gray-800">{reading.fullText}</p>
          </div>
        </article>
        <div className="mt-8 text-center">
          <Link
            href="https://bible.usccb.org/daily-bible-reading"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            View All Readings
          </Link>
        </div>
      </div>
    </div>
  )
}