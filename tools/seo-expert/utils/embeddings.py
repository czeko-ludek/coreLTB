"""
Embeddings & Semantic Similarity - Using Google's text-embedding-004
"""

from google import genai
from google.genai import types
import numpy as np
from typing import List, Dict
import config


class EmbeddingGenerator:
    """Generate embeddings using Google's text-embedding-004 model"""

    def __init__(self):
        if config.GEMINI_API_KEY:
            self.client = genai.Client(api_key=config.GEMINI_API_KEY)
        else:
            self.client = None
            print("⚠️  WARNING: GEMINI_API_KEY not set - embeddings will not work")

    def generate_embedding(self, text: str) -> np.ndarray:
        """
        Generate embedding for text

        Args:
            text: Input text

        Returns:
            768-dimensional embedding vector
        """
        if not self.client:
            return np.zeros(768)

        try:
            # Use new Gemini API for embeddings
            response = self.client.models.embed_content(
                model="text-embedding-004",
                contents=text,
                config=types.EmbedContentConfig(
                    task_type="SEMANTIC_SIMILARITY"
                )
            )
            return np.array(response.embeddings[0].values)

        except Exception as e:
            print(f"⚠️  Embedding generation failed: {str(e)}")
            # Return zero vector as fallback
            return np.zeros(768)

    def generate_embeddings_batch(self, texts: List[str]) -> List[np.ndarray]:
        """
        Generate embeddings for multiple texts

        Args:
            texts: List of input texts

        Returns:
            List of embedding vectors
        """
        embeddings = []
        for text in texts:
            emb = self.generate_embedding(text)
            embeddings.append(emb)
        return embeddings


def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Calculate cosine similarity between two vectors

    Args:
        vec1: First vector
        vec2: Second vector

    Returns:
        Similarity score (0-1)
    """
    # Handle zero vectors
    if np.all(vec1 == 0) or np.all(vec2 == 0):
        return 0.0

    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)

    if norm1 == 0 or norm2 == 0:
        return 0.0

    return float(dot_product / (norm1 * norm2))


def interpret_similarity(score: float) -> Dict:
    """
    Interpret cosine similarity score based on thresholds from strategia-seo.md

    Args:
        score: Cosine similarity score (0-1)

    Returns:
        Interpretation dict with status and message
    """
    thresholds = config.SEMANTIC_THRESHOLDS

    if score >= thresholds['on_target']:
        return {
            'status': 'on_target',
            'icon': '✅',
            'message': 'On Target - treść idealnie odpowiada na zapytanie',
            'color': 'green'
        }
    elif score >= thresholds['minor_deviation']:
        return {
            'status': 'minor_deviation',
            'icon': '⚠️',
            'message': 'Minor Deviation - treść OK, ale można poprawić focus',
            'color': 'yellow'
        }
    elif score >= thresholds['off_topic']:
        return {
            'status': 'moderate_deviation',
            'icon': '⚠️',
            'message': 'Moderate Deviation - treść odchodzi od tematu',
            'color': 'orange'
        }
    else:
        return {
            'status': 'off_topic',
            'icon': '❌',
            'message': 'Off-topic - treść nie na temat',
            'color': 'red'
        }


def calculate_section_similarities(
    target_keyword: str,
    sections: Dict[str, str],
    generator: EmbeddingGenerator
) -> Dict[str, Dict]:
    """
    Calculate semantic similarity for all sections

    Args:
        target_keyword: Main keyword/topic
        sections: Dict of section_name -> section_text
        generator: EmbeddingGenerator instance

    Returns:
        Dict of section_name -> {similarity, interpretation, text}
    """
    # Generate target embedding
    target_embedding = generator.generate_embedding(target_keyword)

    results = {}

    for section_name, section_text in sections.items():
        if not section_text or len(section_text.strip()) < 10:
            continue

        # Generate section embedding
        section_embedding = generator.generate_embedding(section_text)

        # Calculate similarity
        similarity = cosine_similarity(target_embedding, section_embedding)

        # Interpret
        interpretation = interpret_similarity(similarity)

        results[section_name] = {
            'text': section_text[:200] + '...' if len(section_text) > 200 else section_text,
            'similarity': round(similarity, 3),
            'interpretation': interpretation
        }

    return results
