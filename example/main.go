package main

import (
	"image/color"
	"log"

	gol ".."
	"github.com/veandco/go-sdl2/sdl"
)

const (
	size  = 100
	scale = 5
)

func main() {
	if err := sdl.Init(sdl.INIT_EVERYTHING); err != nil {
		panic(err)
	}
	defer sdl.Quit()

	window, err := sdl.CreateWindow("test", sdl.WINDOWPOS_UNDEFINED, sdl.WINDOWPOS_UNDEFINED, size*scale, size*scale, sdl.WINDOW_SHOWN)
	if err != nil {
		panic(err)
	}

	surface, err := window.GetSurface()
	if err != nil {
		panic(err)
	}

	surface.FillRect(nil, 0)

	u := gol.New(size)
	u.AddSeed(10, 10)
	u.AddSeed(11, 11)
	u.AddSeed(12, 9)
	u.AddSeed(12, 10)
	u.AddSeed(12, 11)

	var (
		running = true
		start   = false
		mDown   = false
	)

	for running {
		if start {
			u.Iterate()
			l, d := u.Delta()

			for _, c := range l {
				set(surface, scale, c.X, c.Y, color.White)
			}
			for _, c := range d {
				set(surface, scale, c.X, c.Y, color.Black)
			}

			window.UpdateSurface()
		}

		for event := sdl.PollEvent(); event != nil; event = sdl.PollEvent() {
			switch evt := event.(type) {
			case *sdl.QuitEvent:
				println("Quit")
				running = false
				break

			case *sdl.KeyboardEvent:
				if evt.GetType() == sdl.KEYDOWN && evt.Keysym.Sym == sdl.K_RETURN {
					log.Printf("start")
					start = true
				}

			case *sdl.MouseButtonEvent:
				switch evt.GetType() {
				case sdl.MOUSEBUTTONDOWN:
					mDown = true
				case sdl.MOUSEBUTTONUP:
					mDown = false
				}

			case *sdl.MouseMotionEvent:
				if mDown {
					x, y := int(evt.X/scale), int(evt.Y/scale)
					u.AddSeed(x, y)
					log.Printf("Adding seed to %d,%d", x, y)
				}
			}
		}
	}
}

func set(s *sdl.Surface, scale int, x, y int, color color.Color) {
	for r := y * scale; r < (scale * (1 + y)); r++ {
		for c := x * scale; c < (scale * (1 + x)); c++ {
			s.Set(c, r, color)
		}
	}
}
