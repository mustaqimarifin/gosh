'use client';
import useSWR from 'swr';
import { useEffect } from 'react';
import { LoadingSpinner } from './spinner';
import { fetcher } from 'lib/fetcher';

export type CounterProps = {
  slug?: string;
  total?: number;
  trackView: boolean;
};

export const PageViews = ({ slug, trackView }: CounterProps) => {
  const { data, isLoading } = useSWR<CounterProps>(
    `/api/pageviews/${slug}`,
    fetcher
  );

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/pageviews/${slug}`, {
        method: 'POST',
      });
    if (trackView) {
      registerView();
    }
  }, [slug, trackView]);

  return (
    <p className=" flex-none text-sm font-semibold tracking-tighter text-red-400 ">
      {isLoading ? <LoadingSpinner /> : `${data.total} views`}
    </p>
  );
};
