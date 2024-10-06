import './FishItem.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; 

function removeHtmlTagsAndEntities(str) {
  if (!str) {
    return ''; // Return an empty string if input is null or undefined
}

// Remove HTML tags
const withoutTags = str.replace(/<[^>]*>/g, '');

// Remove HTML entities
const withoutEntities = withoutTags.replace(/&[^;]+;/g, ' ');

// Trim and return the cleaned string
return withoutEntities.trim();
}


const FishItem = ({ fishInfo }) => {
    const { SpeciesName, Calories, FatTotal, ImageGallery, SpeciesIllustrationPhoto, Taste, Texture } = fishInfo;
    const taste = removeHtmlTagsAndEntities(Taste);
    const texture = removeHtmlTagsAndEntities(Texture);
    
    return (
      <div className="fish-item">
      <div className="fish-item-content">
      <LazyLoadImage
      src={ImageGallery?.[0]?.src ?? SpeciesIllustrationPhoto?.src} 
      alt={ImageGallery?.[0]?.alt ?? SpeciesIllustrationPhoto?.alt}
      effect="blur" // Optional: Add an effect while loading
      className="fish-image" // Add a class for styling
    />
        <h3>{SpeciesName}</h3>
        <p><strong>Calories:</strong> {Calories} kcal</p>
        <p><strong>Total Fat:</strong> {FatTotal}</p>
        <p><strong>Taste:</strong> {taste}</p>
        <p><strong>Texture:</strong> {texture}</p>
      </div>
    </div>
  );
};

export default FishItem;
