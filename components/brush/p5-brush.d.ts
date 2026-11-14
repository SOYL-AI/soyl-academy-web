/**
 * Types for the parts of p5.brush's standalone build (p5.brush@3, `p5.brush/standalone`) that the
 * marketing artwork uses. The package ships no declarations. See ADR-033.
 */
declare module 'p5.brush/standalone' {
  type Colour = string;
  /** [x, y, pressure] */
  type SplinePoint = [number, number, number?];

  export function load(target: HTMLCanvasElement | OffscreenCanvas): void;
  export function render(): void;
  export function clear(colour?: Colour): void;
  export function seed(n: number): void;
  export function noiseSeed(n: number): void;
  export function noise(x: number, y?: number, z?: number): number;

  export function push(): void;
  export function pop(): void;
  export function translate(x: number, y: number): void;
  export function rotate(a: number): void;
  export function scale(x: number, y?: number): void;

  export function scaleBrushes(factor: number): void;
  export function set(name: string, colour: Colour, weight?: number): void;
  export function pick(name: string): void;
  export function stroke(colour: Colour): void;
  export function strokeWeight(weight: number): void;
  export function noStroke(): void;

  export function line(x1: number, y1: number, x2: number, y2: number): void;
  export function rect(x: number, y: number, w: number, h: number, mode?: 'corner' | 'center'): void;
  export function circle(x: number, y: number, radius: number, irregularity?: number | boolean): void;
  export function arc(x: number, y: number, radius: number, start: number, end: number): void;
  export function spline(points: SplinePoint[], curvature?: number): void;
  export function polygon(points: [number, number][]): void;
  export function beginShape(curvature?: number): void;
  export function vertex(x: number, y: number, pressure?: number): void;
  export function endShape(close?: boolean): void;
  export function flowLine(x: number, y: number, length: number, dir: number): void;

  export function fill(colour: Colour, opacity?: number): void;
  export function noFill(): void;
  export function fillBleed(strength: number, direction?: 'out' | 'in', angle?: number): void;
  export function fillTexture(texture: number, border: number, scatter?: boolean, split?: boolean): void;
  export function wash(colour: Colour, opacity?: number): void;
  export function noWash(): void;

  export function hatch(dist: number, angle: number, options?: { rand?: number; continuous?: boolean; gradient?: number }): void;
  export function hatchStyle(name: string, colour: Colour, weight?: number): void;
  export function noHatch(): void;

  export function field(name: string): void;
  export function noField(): void;
  export function wiggle(amount?: number): void;
}
