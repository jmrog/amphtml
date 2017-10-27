/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Services} from '../../../../../src/services';

export class ScrollMonitor {
  constructor() {
    this.viewport_ = null;
    this.initialViewHeight_ = 0;
    this.maxScrollTop_ = 0;
    this.maxScrollPlusHeight_ = 0;
  }

  startForDoc(ampDoc) {
    this.viewport_ = Services.viewportForDoc(ampDoc);
    this.initialViewHeight_ = this.viewport_.getHeight() || 0;
    this.maxScrollTop_ = this.viewport_.getScrollTop() || 0;
    this.maxScrollPlusHeight_ = this.maxScrollTop_ + this.initialViewHeight_;

    this.viewport_.onScroll(this.listener.bind(this));
  }

  listener() {
    const scrollTop = this.viewport_.getScrollTop() || 0;
    this.maxScrollTop_ = Math.max(this.maxScrollTop_, scrollTop);
    this.maxScrollPlusHeight_ = Math.max(
        this.maxScrollPlusHeight_,
        (this.viewport_.getHeight() || 0) + scrollTop
    );
  }

  getInitialViewHeight() {
    return this.initialViewHeight_;
  }

  getScrollHeight() {
    return this.maxScrollPlusHeight_ - this.maxScrollTop_;
  }
}
