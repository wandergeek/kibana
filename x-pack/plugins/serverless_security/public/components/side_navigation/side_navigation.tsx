/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiLoadingSpinner, useEuiTheme } from '@elastic/eui';
import { SolutionNav } from '@kbn/shared-ux-page-solution-nav';
import { SolutionSideNav } from '@kbn/security-solution-side-nav';
import { useSideNavItems, useSideNavSelectedId } from '../../hooks/use_side_nav_items';
import { CATEGORIES } from './categories';

export const SecuritySideNavigation: React.FC = () => {
  const { euiTheme } = useEuiTheme();
  const items = useSideNavItems();
  const selectedId = useSideNavSelectedId(items);

  const isLoading = items.length === 0;

  return isLoading ? (
    <EuiLoadingSpinner size="m" data-test-subj="sideNavLoader" />
  ) : (
    <SolutionNav
      canBeCollapsed={false}
      name={'Security'}
      icon={'logoSecurity'}
      children={
        <SolutionSideNav
          items={items}
          categories={CATEGORIES}
          selectedId={selectedId}
          panelTopOffset={`calc(${euiTheme.size.l} * 2)`}
        />
      }
      closeFlyoutButtonPosition={'inside'}
      headingProps={{
        'data-test-subj': 'securitySolutionNavHeading',
      }}
    />
  );
};

// eslint-disable-next-line import/no-default-export
export default SecuritySideNavigation;
