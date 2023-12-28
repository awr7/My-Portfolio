import { Component, ChangeDetectorRef, Inject, PLATFORM_ID,  OnDestroy, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule, isPlatformBrowser  } from '@angular/common';

@Component({
  selector: 'app-puzzle-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puzzle-game.component.html',
  styleUrl: './puzzle-game.component.scss'
})
export class PuzzleGameComponent implements OnInit, OnDestroy {
  tileSize: number = 0;
  tiles: number[] = [];
  emptyTileIndex = 8;
  puzzleSolved = false;
  showHelpModal = false;
  funFactRevealed = false;
  currentImage = '';
  currentFunFact = '';

  imagesWithFacts = [
    { src: '../../assets/blue.png', fact: 'Blue is my favorite color!' },
    { src: '../../assets/dominican.jpeg', fact: 'I was born and raised in the Dominican Republic until the age of 10.' },
    { src: '../../assets/drose.jpg', fact: 'Derrick Rose is my favorite athelete of all time.' },
    { src: '../../assets/piano.png', fact: 'One day I want to learn how to play the piano just to play the song Runaway' },
    { src: '../../assets/sneakers.png', fact: 'I own over 25 sneakers, some of which are valued for over 1,000 dollars!' },
    { src: '../../assets/water.png', fact: 'I believe water is better than juice or soda.' },
    { src: '../../assets/me.jpeg', fact: 'My friends call me cisco.' },
  ];

  @ViewChild('puzzleContainer') puzzleContainer?: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTileSize();
    }
    this.selectRandomImage();
    this.initializeTiles();
    this.shuffleTiles();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
  }

  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTileSize();
      this.cdRef.detectChanges();
    }
  }

  updateTileSize() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth < 1280) {
        this.tileSize = 80;
      } else {
        this.tileSize = 100;
      }
    }
  }

  initializeTiles() {
    this.tiles = Array.from({ length: 9 }, (_, i) => i);
  }

  shuffleTiles() {
    const lastIndex = this.tiles.length - 1;
  
    do {
      // Fisher-Yates shuffle algorithm, adjusted to exclude the last tile
      for (let i = lastIndex - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
      }
    } while (!this.isSolvable());
  
    // Update the empty tile index to the last index after shuffling
    this.emptyTileIndex = this.tiles.lastIndexOf(lastIndex);
  }

  swapTiles(index: number) {
    const [rowClicked, colClicked] = [Math.floor(index / 3), index % 3];
    const [rowEmpty, colEmpty] = [Math.floor(this.emptyTileIndex / 3), this.emptyTileIndex % 3];
  
    // Check if the clicked tile is adjacent to the empty tile
    if (Math.abs(rowClicked - rowEmpty) + Math.abs(colClicked - colEmpty) === 1) {
      if (this.puzzleContainer && this.puzzleContainer.nativeElement) {
        const tilesArray = this.puzzleContainer.nativeElement.children;
        const clickedTile = tilesArray[index] as HTMLElement;
        const emptyTile = tilesArray[this.emptyTileIndex] as HTMLElement;
  
        this.animateTileSwap(clickedTile, emptyTile);
  
        // Reset the state after the animation
        setTimeout(() => {
          [this.tiles[index], this.tiles[this.emptyTileIndex]] = [this.tiles[this.emptyTileIndex], this.tiles[index]];
          this.emptyTileIndex = index;
          this.cdRef.detectChanges();
  
          // Check if the puzzle is solved after updating the state
          if (this.isSolved()) {
            console.log('Puzzle Solved!');
            this.puzzleSolved = true;
            this.funFactRevealed = true;
            this.cdRef.detectChanges();
          }
        }, 125);
      }
    }
  }
  
  animateTileSwap(clickedTile: HTMLElement, emptyTile: HTMLElement) {
    const emptyRect = emptyTile.getBoundingClientRect();
    const clickedRect = clickedTile.getBoundingClientRect();
  
    const translateX = emptyRect.left - clickedRect.left;
    const translateY = emptyRect.top - clickedRect.top;
  
    clickedTile.style.transition = 'transform 0.125s ease-in-out';
    clickedTile.style.transform = `translate(${translateX}px, ${translateY}px)`;
    emptyTile.style.transition = 'transform 0.125s ease-in-out';
    emptyTile.style.transform = `translate(${-translateX}px, ${-translateY}px)`;
  
    setTimeout(() => {
      clickedTile.style.transition = '';
      clickedTile.style.transform = '';
      emptyTile.style.transition = '';
      emptyTile.style.transform = '';
    }, 125);
  }

  getTileStyle(index: number) {
    if (index === this.emptyTileIndex) {
      return {
        'background': 'none',
      };
    }
  
    const size = this.tileSize;
    const xPos = -(this.tiles[index] % 3) * size;
    const yPos = -Math.floor(this.tiles[index] / 3) * size;
  
    return {
      'background-image': `url(${this.currentImage})`,
      'background-position': `${xPos}px ${yPos}px`,
      'background-size': '300%'
    };
  }
  

  isSolvable() {
    let invCount = 0;
    for (let i = 0; i < this.tiles.length - 1; i++) {
      for (let j = i + 1; j < this.tiles.length; j++) {
        if (this.tiles[i] > this.tiles[j]) {
          invCount++;
        }
      }
    }

    // For a 3x3 puzzle, the puzzle is solvable if the number of inversions is even
    return invCount % 2 === 0;
  }


  isSolved() {
    // Check if all tiles are in their correct position
    return this.tiles.every((tile, index) => tile === index);
  }

  restartGame() {
    this.puzzleSolved = false;
    this.shuffleTiles();
    this.cdRef.detectChanges();
    this.funFactRevealed = false;
    this.selectRandomImage();
  }

  selectRandomImage() {
    let randomIndex;
    let selectedPair;
  
    do {
      randomIndex = Math.floor(Math.random() * this.imagesWithFacts.length);
      selectedPair = this.imagesWithFacts[randomIndex];
    } while (selectedPair.src === this.currentImage); // Ensure a new image is selected
  
    this.currentImage = selectedPair.src;
    this.currentFunFact = selectedPair.fact;
  }

  revealFunFact() {
    this.funFactRevealed = true;
    this.puzzleSolved = false;
    this.cdRef.detectChanges();
  }

  showHelp() {
    this.showHelpModal = true;
    this.cdRef.detectChanges();
  }

  closeHelp() {
    this.showHelpModal = false;
    this.cdRef.detectChanges();
  }

  newPuzzle() {
    this.restartGame();
  }

}