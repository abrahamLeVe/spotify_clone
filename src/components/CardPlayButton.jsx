import { usePlayerStore } from "@/store/playerStore";
import { Pause, Play } from "./Player";

export function CardPlayButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);
  const isPlayinPlayList = isPlaying && currentMusic?.playlist.id === id;
  const handleClick = () => {
    if (isPlayinPlayList) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });

        console.log({ songs, playlist });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full p-4 bg-green-500"
    >
      {isPlayinPlayList ? <Pause /> : <Play />}
    </button>
  );
}
