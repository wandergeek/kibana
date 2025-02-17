/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ExpressionAstExpression } from '@kbn/expressions-plugin/common/ast';
import { SavedObjectsFindOptionsReference } from '@kbn/core-saved-objects-api-browser';
import type { SavedObjectCommon } from '@kbn/saved-objects-finder-plugin/common';
import { EventAnnotationGroupContent } from '../../common/types';
import { EventAnnotationConfig, EventAnnotationGroupConfig } from '../../common';

export interface EventAnnotationServiceType {
  loadAnnotationGroup: (savedObjectId: string) => Promise<EventAnnotationGroupConfig>;
  groupExistsWithTitle: (title: string) => Promise<boolean>;
  findAnnotationGroupContent: (
    searchTerm: string,
    pageSize: number,
    references?: SavedObjectsFindOptionsReference[],
    referencesToExclude?: SavedObjectsFindOptionsReference[]
  ) => Promise<{ total: number; hits: EventAnnotationGroupContent[] }>;
  deleteAnnotationGroups: (ids: string[]) => Promise<void>;
  createAnnotationGroup: (group: EventAnnotationGroupConfig) => Promise<{ id: string }>;
  updateAnnotationGroup: (
    group: EventAnnotationGroupConfig,
    savedObjectId: string
  ) => Promise<void>;
  toExpression: (props: EventAnnotationConfig[]) => ExpressionAstExpression[];
  toFetchExpression: (props: {
    interval: string;
    groups: Array<
      Pick<EventAnnotationGroupConfig, 'annotations' | 'ignoreGlobalFilters' | 'indexPatternId'>
    >;
  }) => ExpressionAstExpression[];
  renderEventAnnotationGroupSavedObjectFinder: (props: {
    fixedPageSize?: number;
    onChoose: (value: {
      id: string;
      type: string;
      fullName: string;
      savedObject: SavedObjectCommon<unknown>;
    }) => void;
    onCreateNew: () => void;
  }) => JSX.Element;
}
