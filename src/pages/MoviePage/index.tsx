import { useRef } from 'react';
import { usePopularMoviesInfiniteQuery } from 'src/api/fetchPopular';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { Movie } from 'src/components/Movie';

export const MoviePage = (): JSX.Element => {
  const { data: popularMoviesResponse, fetchNextPage } = usePopularMoviesInfiniteQuery();
  const observer = useRef<IntersectionObserver | null>(null);

  const movies = popularMoviesResponse?.pages.flatMap((el) => el.results);

  const handleIntersect = (el: HTMLElement | null) => {
    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      fetchNextPage();
    });

    if (el) observer.current.observe(el);
  };

  return (
    <div className='movie-page'>
      <Header />
      <div className='movie-list'>
        {movies?.map((movie, index) => <Movie movie={movie} key={`movie-${index}-page`} />)}
      </div>
      <div ref={handleIntersect} />
      <Footer />
    </div>
  );
};
