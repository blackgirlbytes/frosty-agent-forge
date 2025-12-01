import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ChallengePage } from '@/components/ChallengePage';
import { isChallengeUnlocked, CHALLENGE_TITLES, CHALLENGE_DATES } from '@/lib/challenge-utils';

interface PageProps {
  params: {
    day: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const day = parseInt(params.day, 10);
  
  if (isNaN(day) || day < 1 || day > 17) {
    return {
      title: 'Challenge Not Found',
    };
  }

  const title = CHALLENGE_TITLES[day];
  const decemberDate = CHALLENGE_DATES[day];

  return {
    title: `${title} | Advent of AI`,
    description: `Day ${day} of Advent of AI - Unlock this challenge on December ${decemberDate} at noon ET`,
    openGraph: {
      title: `${title} | Advent of AI`,
      description: `Day ${day} of Advent of AI - Build your AI agent expertise`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Advent of AI`,
      description: `Day ${day} of Advent of AI`,
    },
  };
}

export async function generateStaticParams() {
  // Generate paths for all 17 days
  return Array.from({ length: 17 }, (_, i) => ({
    day: String(i + 1),
  }));
}

export default function ChallengePageRoute({ params }: PageProps) {
  const day = parseInt(params.day, 10);

  // Validate day parameter
  if (isNaN(day) || day < 1 || day > 17) {
    notFound();
  }

  // Check if challenge is unlocked
  const unlocked = isChallengeUnlocked(day);

  // If locked, redirect to home with a message
  if (!unlocked) {
    redirect('/?locked=' + day);
  }

  return <ChallengePage day={day} />;
}
