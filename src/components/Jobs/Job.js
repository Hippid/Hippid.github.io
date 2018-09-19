// Job.js
import React from 'react';
import PropTypes from 'prop-types';
// var FontAwesome = require('react-fontawesome');
import { onKeyPress } from '../Common/Input';

RenderCompany.propTypes = {
  company: PropTypes.string,
  source: PropTypes.string,
  companyLink: PropTypes.string,
};

RenderCompany.defaultProps = {
  company: '',
  source: '',
  companyLink: '',
};

function RenderCompany(props) {
  const { company, source, companyLink } = props;
  if (company) {
    if (source && companyLink) {
      let link = '';
      if (companyLink.startsWith('http')) {
        link = companyLink;
      } else {
        link = `https://${source}.com${companyLink}`;
      }
      return (<span className="job_company"><a target="_blank" rel="noopener noreferrer" href={link}>{company}</a></span>);
    }
    return (<span className="job_company">{props.company}</span>);
  }
  return (<span className="job_company" />);
}

function removePrefix(string) {
  return string.replace(/[a-z]{2}[_]/, '');
}

function JobTitle(props) {
  if (props.source && props.job_link) {
    let fullhref = '';
    const joblink = removePrefix(props.job_link);
    if (props.source === 'ziprecruiter') {
      if (props.job_link_full) {
        fullhref = props.job_link_full;
      } else {
        fullhref = joblink;
      }
    } else if (joblink.startsWith('http')) {
      fullhref = joblink;
    } else {
      fullhref = `https://${props.source}.com${joblink}`;
    }
    const { jobTitle } = props;
    return (<a target="_blank" rel="noopener noreferrer" href={fullhref}>{jobTitle}</a>);
  }
  return props.jobTitle;
}

function Location(props) {
  const { location } = props;
  if (location) {
    return (<span className="job_location">{location}</span>);
  }

  return (<span className="job_location" />);
}

Location.propTypes = {
  location: PropTypes.string,
};

Location.defaultProps = {
  location: '',
};

function SearchTerms(props) {
  const { searchTerm } = props;
  if (searchTerm) {
    return (<span className="job_search">{searchTerm.join(', ')}</span>);
    // const searchterms = props.search_term;
    // searchterms.map((st) => { return(<span className="job_search">{st}</span>); });
  }
  return (<span className="job_search" />);
}

SearchTerms.propTypes = {
  searchTerm: PropTypes.arrayOf(PropTypes.string),
};

SearchTerms.defaultProps = {
  searchTerm: [],
};

function ShowHide(props) {
  const { hide, handleHideJob, id } = props;
  if (!hide) {
    return (
      <span className="job_hide">
        <a role="button" tabIndex={0} aria-label="Hide" alt="Hide" onClick={handleHideJob} onKeyPress={onKeyPress} id={id}>
          <i className="fa fa-remove" aria-hidden="true" />
        </a>
      </span>);
  }
  return (
    <span className="job_hide">
      <a role="button" tabIndex={0} aria-label="Show" alt="Show" onClick={handleHideJob} onKeyPress={onKeyPress} id={id}>
        <i className="fa fa-eye" aria-hidden="true" />
      </a>
    </span>);
}

ShowHide.propTypes = {
  hide: PropTypes.bool,
  handleHideJob: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

ShowHide.defaultProps = {
  hide: false,
};


function ShowWage(props) {
  const { wage } = props;
  let twage = wage.substring(0, 38).trim();
  const cutindex = wage.indexOf('·');
  if (cutindex > 0) {
    twage = twage.substring(0, cutindex).trim();
  }
  return (<span className="job_wage">{twage}</span>);
}

ShowWage.propTypes = {
  wage: PropTypes.string,
};

ShowWage.defaultProps = {
  wage: '',
};

// function ShowRocket(props) {
// return(<FontAwesome
// className='super-crazy-colors'
// name='rocket'
// size='2x'
// spin
// style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
// />)
// }

// {props.wage_min_currency} {props.wage_min} - {props.wage_max_currency} {props.wage_max}
const Job = (props) => {
  const {
    id, jobTitle, jobLink, wage, posted, description, company, companyLink, location, source, searchTerm, handleHideJob, wageMaxEur, jobLinkFull, hide,
  } = props;
  const wm = Math.round(wageMaxEur);
  return (
    <div className="job_row" title={description}>
      <span className="job_eu_wage">{wm}</span>
      <ShowWage wage={wage} />
      <span className="job_title"><JobTitle source={source} jobTitle={jobTitle} job_link={jobLink} job_link_full={jobLinkFull} /></span>
      <span className="job_posted">{posted}</span>
      <RenderCompany company={company} source={source} companyLink={companyLink} />
      <SearchTerms searchTerm={searchTerm} />
      <Location location={location} />
      <ShowHide hide={hide} handleHideJob={handleHideJob} id={id} />
    </div>);
};

Job.propTypes = {
  id: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobLink: PropTypes.string.isRequired,
  wage: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  company: PropTypes.string,
  companyLink: PropTypes.string,
  location: PropTypes.string,
  source: PropTypes.string,
  searchTerm: PropTypes.arrayOf(PropTypes.string),
  handleHideJob: PropTypes.func.isRequired,
  wageMaxEur: PropTypes.number.isRequired,
  jobLinkFull: PropTypes.string,
  hide: PropTypes.bool,
};

Job.defaultProps = {
  company: '',
  companyLink: '',
  location: '',
  source: '',
  searchTerm: [''],
  jobLinkFull: '',
  hide: false,
};

export default Job;
