const form = document.querySelector('form');
const canvas = document.getElementById('album-art');
const ctx = canvas.getContext('2d');

form.addEventListener('submit', generateAlbumArt);

function generateAlbumArt(event) {
  event.preventDefault();

  const title = document.getElementById('album-title').value;
  const artist = document.getElementById('artist-name').value;
  const genre = document.getElementById('genre').value;
  const releaseDate = document.getElementById('release-date').value;
  const file = document.getElementById('album-cover').files[0];

  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const sticker = new Image();
    sticker.src = 'parental-advisory.png';
    sticker.onload = function() {
      ctx.drawImage(sticker, img.width - sticker.width, img.height - sticker.height);
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(title, canvas.width / 2, 20);
      ctx.font = 'bold 16px Arial';
      ctx.fillText(artist, canvas.width / 2, 40);
      ctx.fillText(genre, canvas.width / 2, 60);
      ctx.fillText(releaseDate, canvas.width / 2, 80);

      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = 'album-art.png';
      a.click();
    };
  };
}
