/**
 * Renders an `SvgNode[]` drawing (svg-tree.ts) as React elements. Decorative by default (aria-hidden); pass
 * `title` to make it an image with an accessible name. No dangerouslySetInnerHTML (WEB-6).
 */
import { createElement, type ReactElement } from 'react';
import type { SvgNode } from './svg-tree';

function toElement([tag, attrs, children]: SvgNode, key: number): ReactElement {
  return createElement(tag, { ...attrs, key }, children?.map(toElement));
}

export interface SvgTreeProps {
  nodes: readonly SvgNode[];
  viewBox?: string;
  size?: number | string;
  /** Accessible name; omit for decorative art. */
  title?: string;
  className?: string;
  'data-art'?: string;
}

export function SvgTree({ nodes, viewBox = '0 0 64 64', size = '100%', title, className, ...rest }: SvgTreeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      focusable="false"
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
      {...rest}
    >
      {nodes.map(toElement)}
    </svg>
  );
}
