import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { useLibrary } from "@/app/context/LibraryContext";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import * as THREE from "three";

function Shelf({ position }: any) {
  const woodTexture = useTexture("/woodTexture.jpg"); // Replace with the path to your texture
  const baseX = position[0];
  const baseY = position[1];
  const baseZ = position[2];

  return (
    <group position={position}>
      {/* Main Shelf Body */}
      <mesh position={[baseX, baseY, baseZ]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Back Panel */}
      <mesh position={[baseX, baseY + 0.45, baseZ - 0.45]}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Left Side Panel */}
      <mesh position={[baseX - 1.05, baseY + 0.45, baseZ]}>
        <boxGeometry args={[0.1, 1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Right Side Panel */}
      <mesh position={[baseX + 1.05, baseY + 0.45, baseZ]}>
        <boxGeometry args={[0.1, 1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>
    </group>
  );
}

function Book({ color, position, book, setActiveBook }: any) {
  const [yC, setYC] = useState(0);
  const [zC, setZC] = useState(0);
  const [finalPosition, setFinalPosition] = useState(position);
  return (
    <mesh
      onPointerEnter={() => {
        // setYC(0.1);
        setZC(0.2);
      }}
      onPointerLeave={() => {
        // setYC(0);
        setZC(0);
      }}
      onClick={() => {
        setActiveBook(book.volumeInfo?.image);
        console.log(book);
      }}
      position={[position[0], position[1] + yC, position[2] + zC]}
    >
      <boxGeometry args={[0.2, 0.8, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function HighlightedBook({ imageUrl }: any) {
  const key = "AIzaSyAy6N9e4fUmp4VW0REwaMzhCkaoXy6a6rU"; // books api
  const urlP = `${imageUrl}?key=${key}}`;
  const texture = imageUrl
    ? useLoader(THREE.TextureLoader, urlP)
    : (null as any);

  return (
    <group position={[3, 0.5, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 2.5, 0.3]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[1.5, 2.5]} />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial color="beige" />
        )}
      </mesh>
    </group>
  );
}

function Scene() {
  const { user } = useAuth();
  const { library } = useLibrary();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      axios
        .post(`http://localhost:4500/library`, { userId: user.uid })
        .then((res) => {
          const transformedBooks: any = Object.entries(res.data).map(
            ([id, volumeInfo]) => ({
              id,
              ...(volumeInfo ?? {}),
            })
          );
          if (transformedBooks) setBooks(transformedBooks);
          console.log(transformedBooks);
        })
        .catch((err) => console.log(err));
    }
    console.log("library", library);
  }, [library]);

  const maxBooksPerShelf = 10; // Maximum number of books per shelf
  const bookWidth = 0.2; // Width of each book

  // Helper function to calculate book position
  const yIncrease = 1;
  const shelfSpacing = 0.5; // Adjust this value as needed
  const getBookPosition = (index: number) => {
    const shelfIndex = Math.floor(index / maxBooksPerShelf);
    const positionOnShelf = index % maxBooksPerShelf;
    const x = -0.9 + positionOnShelf * bookWidth;
    const y = relativeShelfPositions[shelfIndex] * yIncrease + 0.45;
    const z = 0;

    return [x, y, z];
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Relative positions: -2 and -1 for below, 0 for middle, 1 and 2 for above
  const relativeShelfPositions = [-2, -1, 0, 1, 2];

  // Convert relative positions to actual positions
  const shelfPositions = relativeShelfPositions.map((relativePosition) => [
    0,
    relativePosition * shelfSpacing,
    0,
  ]);

  const [activeBook, setActiveBook] = useState(null);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <HighlightedBook imageUrl={activeBook} />
      {shelfPositions.map((position, index) => (
        <Shelf key={index} position={position} />
      ))}
      {books.map((book: any, index) => (
        <Book
          setActiveBook={setActiveBook}
          key={book.id}
          color={getRandomColor()}
          position={getBookPosition(index)}
          book={book}
        />
      ))}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default function ThreeLibrary() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Scene />
    </div>
  );
}
