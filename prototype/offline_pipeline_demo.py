from dataclasses import dataclass
from math import sqrt
from typing import List


@dataclass
class Embedding:
    model_id: str
    vector: List[float]


def normalize(vector: List[float]) -> List[float]:
    magnitude = sqrt(sum(value * value for value in vector))
    if magnitude == 0:
        raise ValueError("Cannot normalize a zero vector")
    return [value / magnitude for value in vector]


def cosine_similarity(left: Embedding, right: Embedding) -> float:
    if left.model_id != right.model_id:
        raise ValueError("Model IDs must match")
    left_norm = normalize(left.vector)
    right_norm = normalize(right.vector)
    return sum(a * b for a, b in zip(left_norm, right_norm))


def demo() -> None:
    enrolled = Embedding("mobilefacenet-target", [0.9, 0.1, 0.3, 0.2])
    probe = Embedding("mobilefacenet-target", [0.88, 0.12, 0.31, 0.21])
    score = cosine_similarity(enrolled, probe)
    print(f"Demo similarity score: {score:.3f}")


if __name__ == "__main__":
    demo()
