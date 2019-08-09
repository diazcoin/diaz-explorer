import Actions from '../core/Actions';
import Component from '../core/Component';
import throttle from '../../lib/throttle';
import { connect } from 'react-redux';
import { dateFormat } from '../../lib/date';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes, { oneOf } from 'prop-types';
import React from 'react';
import sortBy from 'lodash/sortBy';

import HorizontalRule from '../component/HorizontalRule';
import Pagination from '../component/Pagination';
import Table from '../component/Table';
import Select from '../component/Select';

import { PAGINATION_PAGE_SIZE } from '../constants';

class Governance extends Component {
  static propTypes = {
    getPPs: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.debounce = null;
    this.state = {
      cols: [
        { key: 'name', title: 'Name' },
        { key: 'blockStart', title: 'Start' },
        { key: 'blockEnd', title: 'End' },
        { key: 'budgetMonthly', title: (
          <span className="badge-right">Monthly</span>
        )},
        { key: 'budgetPaid', title: (
          <span className="badge-right">Paid</span>
        )},
        { key: 'budgetTotal', title: (
          <span className="badge-right">Total</span>
        )},
        { key: 'yeas', title: (
          <span className="badge-right">Yeas</span>
        )},
        { key: 'nays', title: (
          <span className="badge-right">Nays</span>
        )},
        { key: 'status', title: 'Funded' }
      ],
      error: null,
      loading: true,
      pps: [] ,
      pages: 0,
      page: 1,
      size: 10
    };

    this.getThrottledPps = throttle(() => {
      this.props.getPPs({
        limit: this.state.size,
        skip: (this.state.page - 1) * this.state.size
      }).then(({ pps, pages }) => {
        this.setState({ pps, pages, loading: false });
      })
      .catch(error => this.setState({ error, loading: false }));
    }, 800);

  };

  componentDidMount() {
    this.getPPs();
  };

  componentWillUnmount() {
    if (this.getThrottledPps) {
      clearTimeout(this.getThrottledPps);
    }
  };

  getPPs = () => {
    this.setState({ loading: true }, () => {
      this.getThrottledPps();
    });
  };

  handlePage = page => this.setState({ page }, this.getPPs);
  handleSize = size => this.setState({ size, page: 1 }, this.getPPs);

  render() {
    if (!!this.state.error) {
      return this.renderError(this.state.error);
    } else if (this.state.loading) {
      return this.renderLoading();
    }
    const selectOptions = PAGINATION_PAGE_SIZE;

    const getPaginationDropdown = () => {
      return (
        <Select
          onChange={ value => this.handleSize(value) }
          selectedValue={ this.state.size }
          options={ selectOptions } />
      );
    };

    return (
      <div>
        <HorizontalRule
          select={ getPaginationDropdown() }
          title="Current Proposals" />
        <Table
          header={ this.state.cols }
          data={ this.state.pps.map((pp) => {
            var isFunded = "No"
            if (pp.status == true) {
              isFunded = "Yes";
            }
            return {
              ...pp,
              name: (
                <a href={`${pp.url}`} target="_blank">
                  {pp.name}
                </a>
              ),
              blockStart: pp.blockStart,
              blockEnd: pp.blockEnd,
              budgetMonthly: (
                <span className="badge badge-transaction-amount badge-right">
                  {numeral(pp.budgetMonthly).format(config.coinDetails.coinNumberFormat)}
                </span>
              ),
              budgetPaid: (
                <span className="badge badge-transaction-amount badge-right">
                  {numeral(pp.budgetTotal - pp.budgetMonthly * pp.budgetPeriod).format(config.coinDetails.coinNumberFormat)}
                </span>
              ),
              budgetTotal: (
                <span className="badge badge-transaction-amount badge-right">
                  {numeral(pp.budgetTotal).format(config.coinDetails.coinNumberFormat)}
                </span>
              ),
              yeas: (
                <span className="badge badge-success badge-right">
                  {pp.yeas}
                </span>
              ),
              nays: (
                <span className="badge badge-danger badge-right">
                  {pp.nays}
                </span>
              ),
              status: (
                <span className={ `badge badge-${pp.status ? 'success' : 'danger' }` }>
                  {isFunded}
                </span>
              )
            };
          })} />
        <Pagination
          current={ this.state.page }
          className="float-right"
          onPage={ this.handlePage }
          total={ this.state.pages } />
        <div className="clearfix" />
      </div>
    );
  };
}

const mapDispatch = dispatch => ({
  getPPs: query => Actions.getPPs(query)
});

export default connect(null, mapDispatch)(Governance);
