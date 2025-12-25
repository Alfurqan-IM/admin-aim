// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Dashboard components
import React from "react";
import { usegetAllUser } from "features/users/userThunk";
import { useAllBanners } from "features/banners/bannerThunk";
import { useAllEvent } from "features/events/eventThunk";
import { useGetAllProgrammes } from "features/programmes/programmeThunk";
import { useGetAllReg } from "features/registerations/registerationThunk";
import { useGetAllDonations } from "features/donations/donationThunk";

function Dashboard() {
  const { users } = usegetAllUser();
  const { banners: Banners } = useAllBanners();
  const { campaigns: Campaigns } = useAllBanners();
  const { events: Events } = useAllEvent();
  const { programmes: Programmes } = useGetAllProgrammes();
  const { registerations: Registerations } = useGetAllReg();
  const { donations: Donations } = useGetAllDonations();
  //users
  const totalUsers = users?.totalUsers ?? "N/A";
  const genderStats = (users?.genderCount ?? []).reduce((acc, item) => {
    acc[item.gender] = item._count.user_id;
    return acc;
  }, {});
  const verificationStats = (users?.verificationCount ?? []).reduce((acc, item) => {
    acc[item.isVerified ? "verified" : "unverified"] = item._count.user_id;
    return acc;
  }, {});
  //banners
  const banners = Banners?.banners ?? [];
  const totalBanners = banners?.totalBanners ?? banners.length;
  const now = new Date();
  const bannerStats = banners.reduce(
    (acc, banner) => {
      const start = new Date(banner.start_date);
      const end = new Date(banner.end_date);

      if (start <= now && end >= now) acc.active += 1;
      else if (start > now) acc.upcoming += 1;
      else acc.expired += 1;

      acc.years.add(banner.year);

      return acc;
    },
    {
      active: 0,
      upcoming: 0,
      expired: 0,
      years: new Set(),
    }
  );
  const uniqueYears = bannerStats.years.size;
  // campaign
  const campaigns = Campaigns?.campaign ?? [];
  const totalCampaigns = campaigns?.totalCampaign ?? campaigns.length;

  const _now = new Date();

  const campaignStats = campaigns.reduce(
    (acc, campaign) => {
      const start = new Date(campaign.start_date);
      const end = new Date(campaign.end_date);

      // Date-based status
      if (start <= _now && end >= _now) acc.activeByDate += 1;
      else if (start > _now) acc.upcoming += 1;
      else acc.expired += 1;

      // API status-based
      if (campaign.status === "active") acc.activeByStatus += 1;
      else acc.inactive += 1;

      return acc;
    },
    {
      activeByDate: 0,
      upcoming: 0,
      expired: 0,
      activeByStatus: 0,
      inactive: 0,
    }
  );

  //events
  const events = Events?.event ?? [];
  const totalEvents = events?.totalEvent ?? events.length;

  const now_ = new Date();

  const eventStats = events.reduce(
    (acc, event) => {
      // Status-based count
      if (event.status === "upcoming") acc.upcomingByStatus += 1;
      else acc.otherStatus += 1;

      // Date-based logic
      if (!event.event_date) {
        acc.noDate += 1;
      } else {
        const eventDate = new Date(event.event_date);
        if (eventDate >= now_) acc.upcomingByDate += 1;
        else acc.past += 1;
      }

      return acc;
    },
    {
      upcomingByDate: 0,
      past: 0,
      noDate: 0,
      upcomingByStatus: 0,
      otherStatus: 0,
    }
  );

  // programmes
  const programmes = Programmes?.programmes ?? [];
  const totalProgrammes = programmes?.totalProgrammes ?? programmes.length;

  const $now = new Date();

  const programmeStats = programmes.reduce(
    (acc, programme) => {
      const start = programme.start_date ? new Date(programme.start_date) : null;
      const end = programme.end_date ? new Date(programme.end_date) : null;

      if (!start || !end) {
        acc.missingDates += 1;
        return acc;
      }

      // Ongoing programmes
      if (start <= $now && end >= $now) acc.ongoing += 1;

      // Completed
      if (end < $now) acc.completed += 1;

      // Upcoming
      if (start > $now) acc.upcoming += 1;

      // Same-day programmes
      if (start.getTime() === end.getTime()) acc.singleDay += 1;

      return acc;
    },
    {
      ongoing: 0,
      completed: 0,
      upcoming: 0,
      singleDay: 0,
      missingDates: 0,
    }
  );
  //registeration
  const registrations = Registerations?.registrations ?? [];
  const totalRegistrations = registrations?.total ?? registrations.length;

  const moment = new Date();
  const currentMonth = moment.getMonth();
  const currentYear = moment.getFullYear();

  const registrationStats = registrations.reduce(
    (acc, reg) => {
      const created = reg.createdAt ? new Date(reg.createdAt) : null;

      // Category
      if (reg.category === "Adult") acc.adult += 1;
      if (reg.category === "Youth") acc.youth += 1;

      // Discovery method
      if (reg.discovery_method) {
        acc.discovery[reg.discovery_method] = (acc.discovery[reg.discovery_method] || 0) + 1;
      }

      // This month
      if (created && created.getMonth() === currentMonth && created.getFullYear() === currentYear) {
        acc.thisMonth += 1;
      }

      // Unique users
      if (reg.user_id) acc.uniqueUsers.add(reg.user_id);

      return acc;
    },
    {
      adult: 0,
      youth: 0,
      thisMonth: 0,
      discovery: {},
      uniqueUsers: new Set(),
    }
  );
  const topDiscoveryMethod =
    Object.entries(registrationStats.discovery).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
  //donations
  const donations = Donations?.donations ?? [];
  const donationStats = donations.reduce(
    (acc, donation) => {
      const amount = Number(donation.amount || 0);

      acc.totalAmount += amount;
      acc.totalCount += 1;

      if (donation.recurring) acc.recurring += 1;
      else acc.oneTime += 1;

      if (donation.anonymous_donation) acc.anonymous += 1;

      if (donation.status === "paid") acc.paid += 1;

      if (donation.campaign?.name) {
        acc.campaigns[donation.campaign.name] =
          (acc.campaigns[donation.campaign.name] || 0) + amount;
      }

      return acc;
    },
    {
      totalAmount: 0,
      totalCount: 0,
      recurring: 0,
      oneTime: 0,
      anonymous: 0,
      paid: 0,
      campaigns: {},
    }
  );
  const topCampaign =
    Object.entries(donationStats.campaigns).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* users */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="group"
                title="Users"
                count={totalUsers}
                percentage={{
                  color: "forest",
                  amount: `${genderStats.male ?? 0} Male`,
                  label: `${genderStats.female ?? 0} Female`,
                }}
              />
            </MDBox>
          </Grid>
          {/* banners */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="verified"
                title="Verified Users"
                count={verificationStats.verified ?? 0}
                percentage={{
                  color: "forest",
                  amount: "Verified",
                  label: "Total verified users",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="image"
                title="Banners"
                count={totalBanners}
                percentage={{
                  color: "forest",
                  amount: `${bannerStats.active} Active`,
                  label: `${bannerStats.expired} Expired`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="event_available"
                title="Banner Status"
                count={bannerStats.active}
                percentage={{
                  color: "forest",
                  amount: `${bannerStats.upcoming} Upcoming`,
                  label: `${bannerStats.expired} Expired`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="calendar_month"
                title="Banner Years"
                count={uniqueYears}
                percentage={{
                  color: "warning",
                  amount: "Active years",
                  label: "Across programmes",
                }}
              />
            </MDBox>
          </Grid>
          {/* campaign */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="campaign"
                title="Campaigns"
                count={totalCampaigns}
                percentage={{
                  color: "forest",
                  amount: `${campaignStats.activeByDate} Active`,
                  label: `${campaignStats.expired} Expired`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="event"
                title="Campaign Timeline"
                count={campaignStats.activeByDate}
                percentage={{
                  color: "forest",
                  amount: `${campaignStats.upcoming} Upcoming`,
                  label: `${campaignStats.expired} Ended`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="toggle_on"
                title="Campaign Status"
                count={campaignStats.activeByStatus}
                percentage={{
                  color: "forest",
                  amount: "Active",
                  label: `${campaignStats.inactive} Inactive`,
                }}
              />
            </MDBox>
          </Grid>
          {/* events */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="event"
                title="Events"
                count={totalEvents}
                percentage={{
                  color: "forest",
                  amount: `${eventStats.upcomingByDate} Upcoming`,
                  label: `${eventStats.past} Past`,
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="schedule"
                title="Event Timeline"
                count={eventStats.upcomingByDate}
                percentage={{
                  color: "forest",
                  amount: "Upcoming",
                  label: `${eventStats.past} Completed`,
                }}
              />
            </MDBox>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="flag"
                title="Event Status"
                count={eventStats.upcomingByStatus}
                percentage={{
                  color: "forest",
                  amount: "Upcoming",
                  label: `${eventStats.otherStatus} Other`,
                }}
              />
            </MDBox>
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="warning"
                title="Missing Dates"
                count={eventStats.noDate}
                percentage={{
                  color: eventStats.noDate > 0 ? "warning" : "forest",
                  amount: "Needs Review",
                  label: "Events without date",
                }}
              />
            </MDBox>
          </Grid> */}
          {/* programmes */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="school"
                title="Programmes"
                count={totalProgrammes}
                percentage={{
                  color: "forest",
                  amount: `${programmeStats.ongoing} Ongoing`,
                  label: `${programmeStats.completed} Completed`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="schedule"
                title="Programme Timeline"
                count={programmeStats.ongoing}
                percentage={{
                  color: "forest",
                  amount: "Ongoing",
                  label: `${programmeStats.upcoming} Upcoming`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="check_circle"
                title="Completed"
                count={programmeStats.completed}
                percentage={{
                  color: "forest",
                  amount: "Finished",
                  label: "End date passed",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="warning"
                title="Special Cases"
                count={programmeStats.singleDay}
                percentage={{
                  color:
                    programmeStats.missingDates > 0 || programmeStats.singleDay > 0
                      ? "warning"
                      : "forest",
                  amount: `${programmeStats.singleDay} Single-day`,
                  label: `${programmeStats.missingDates} Missing dates`,
                }}
              />
            </MDBox>
          </Grid> */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="how_to_reg"
                title="Registrations"
                count={totalRegistrations}
                percentage={{
                  color: "forest",
                  amount: `${registrationStats.adult} Adult`,
                  label: `${registrationStats.youth} Youth`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person"
                title="Unique Users"
                count={registrationStats.uniqueUsers.size}
                percentage={{
                  color: "forest",
                  amount: "Registered",
                  label: "Users",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="calendar_month"
                title="This Month"
                count={registrationStats.thisMonth}
                percentage={{
                  color: "forest",
                  amount: "New",
                  label: "Registrations",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person"
                title="Unique Users"
                count={registrationStats.uniqueUsers.size}
                percentage={{
                  color: "forest",
                  amount: "Registered",
                  label: "Users",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="travel_explore"
                title="Top Discovery"
                count={topDiscoveryMethod}
                percentage={{
                  color: "forest",
                  amount: "Most used",
                  label: "Discovery method",
                }}
              />
            </MDBox>
          </Grid>
          {/* donations */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="volunteer_activism"
                title="Donations"
                count={donationStats.totalCount}
                percentage={{
                  color: "forest",
                  amount: `${donationStats.paid}`,
                  label: "Paid donations",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="attach_money"
                title="Amount Raised"
                count={`$${donationStats.totalAmount.toFixed(2)}`}
                percentage={{
                  color: "forest",
                  amount: `${donationStats.recurring}`,
                  label: "Recurring donations",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="sync_alt"
                title="Donation Types"
                count={donationStats.oneTime}
                percentage={{
                  color: "warning",
                  amount: `${donationStats.recurring}`,
                  label: "Recurring",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="emoji_events"
                title="Top Campaign"
                count={topCampaign}
                percentage={{
                  color: "forest",
                  amount: "Highest",
                  label: "Total raised",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
