"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  TrendingUp,
  MapPin,
  Database,
  Loader2,
  ChevronRight,
} from "lucide-react";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Logged-in User's Leads
  // ==========================================

  useEffect(() => {
    const getLeads = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/leads", {
          cache: "no-store",
        });

        const result = await res.json();

        if (result.success) {
          setData(result.leads || []);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getLeads();
  }, []);

  // ==========================================
  // Dashboard Statistics
  // ==========================================

  const statistics = useMemo(() => {
    if (!data.length) {
      return {
        totalSearches: 0,
        totalLeads: 0,
        mostSearched: {
          query: "No data",
          count: 0,
        },
        mostRequested: {
          query: "No data",
          total: 0,
        },
        topLocation: {
          location: "No data",
          count: 0,
        },
      };
    }

    // ------------------------------------------
    // Total Searches
    // ------------------------------------------

    const totalSearches = data.length;

    // ------------------------------------------
    // Total Generated Leads
    // ------------------------------------------

    const totalLeads = data.reduce((total, item) => {
      return total + (item.leads?.length || 0);
    }, 0);

    // ------------------------------------------
    // Query Count
    // ------------------------------------------

    const queryCount = {};

    data.forEach((item) => {
      const query = item.query?.toLowerCase();

      if (!query) return;

      queryCount[query] = (queryCount[query] || 0) + 1;
    });

    // ------------------------------------------
    // Most Searched Query
    // ------------------------------------------

    let mostSearchedQuery = "No data";
    let mostSearchedCount = 0;

    Object.entries(queryCount).forEach(([query, count]) => {
      if (count > mostSearchedCount) {
        mostSearchedQuery = query;
        mostSearchedCount = count;
      }
    });

    // ------------------------------------------
    // Requested Leads By Query
    // ------------------------------------------

    const requestedByQuery = {};

    data.forEach((item) => {
      const query = item.query?.toLowerCase();

      if (!query) return;

      requestedByQuery[query] =
        (requestedByQuery[query] || 0) + Number(item.totalRequested || 0);
    });

    // ------------------------------------------
    // Most Requested Query
    // ------------------------------------------

    let mostRequestedQuery = "No data";
    let mostRequestedTotal = 0;

    Object.entries(requestedByQuery).forEach(([query, total]) => {
      if (total > mostRequestedTotal) {
        mostRequestedQuery = query;
        mostRequestedTotal = total;
      }
    });

    // ------------------------------------------
    // Location Count
    // ------------------------------------------

    const locationCount = {};

    data.forEach((item) => {
      const location = item.location?.toLowerCase();

      if (!location) return;

      locationCount[location] = (locationCount[location] || 0) + 1;
    });

    // ------------------------------------------
    // Top Location
    // ------------------------------------------

    let topLocation = "No data";
    let topLocationCount = 0;

    Object.entries(locationCount).forEach(([location, count]) => {
      if (count > topLocationCount) {
        topLocation = location;
        topLocationCount = count;
      }
    });

    return {
      totalSearches,
      totalLeads,

      mostSearched: {
        query: mostSearchedQuery,
        count: mostSearchedCount,
      },

      mostRequested: {
        query: mostRequestedQuery,
        total: mostRequestedTotal,
      },

      topLocation: {
        location: topLocation,
        count: topLocationCount,
      },
    };
  }, [data]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={35} className="animate-spin text-primary" />

          <p className="text-sm text-base-content/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* =====================================
            Header
        ====================================== */}

        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Lead Generation Dashboard
          </h1>

          <p className="mt-1 text-sm text-base-content/60">
            Overview of your lead generation activities.
          </p>
        </div>

        {/* =====================================
            Statistics
        ====================================== */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Total Searches */}

          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">Total Searches</p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {statistics.totalSearches}
                  </h2>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Search size={24} className="text-primary" />
                </div>
              </div>

              <p className="mt-3 text-xs text-base-content/50">
                Total lead generation searches
              </p>
            </div>
          </div>

          {/* Total Leads */}

          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">Total Leads</p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {statistics.totalLeads}
                  </h2>
                </div>

                <div className="rounded-xl bg-success/10 p-3">
                  <Users size={24} className="text-success" />
                </div>
              </div>

              <p className="mt-3 text-xs text-base-content/50">
                Leads generated from all searches
              </p>
            </div>
          </div>

          {/* Most Searched */}

          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">Most Searched</p>

                  <h2 className="mt-2 text-xl font-bold capitalize">
                    {statistics.mostSearched.query}
                  </h2>
                </div>

                <div className="rounded-xl bg-warning/10 p-3">
                  <TrendingUp size={24} className="text-warning" />
                </div>
              </div>

              <p className="mt-3 text-xs text-base-content/50">
                Searched {statistics.mostSearched.count} time
                {statistics.mostSearched.count !== 1 && "s"}
              </p>
            </div>
          </div>

          {/* Most Requested */}

          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">Most Requested</p>

                  <h2 className="mt-2 text-xl font-bold capitalize">
                    {statistics.mostRequested.query}
                  </h2>
                </div>

                <div className="rounded-xl bg-info/10 p-3">
                  <Database size={24} className="text-info" />
                </div>
              </div>

              <p className="mt-3 text-xs text-base-content/50">
                {statistics.mostRequested.total} leads requested
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            Top Location
        ====================================== */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  Top Lead Location
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <MapPin size={22} className="text-primary" />

                  <h2 className="text-2xl font-bold capitalize">
                    {statistics.topLocation.location}
                  </h2>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">
                  {statistics.topLocation.count}
                </p>

                <p className="text-xs text-base-content/50">searches</p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            Search History
        ====================================== */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-0">
            <div className="border-b border-base-300 p-5">
              <h2 className="card-title">Search History</h2>

              <p className="mt-1 text-sm text-base-content/60">
                Your recent lead generation searches
              </p>
            </div>

            {data.length === 0 ? (
              <div className="p-10 text-center">
                <Search size={40} className="mx-auto text-base-content/20" />

                <p className="mt-3 font-medium">No searches found</p>

                <p className="mt-1 text-sm text-base-content/50">
                  Generate your first leads to see them here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Search</th>
                      <th>Location</th>
                      <th>Requested</th>
                      <th>Generated</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="hover:bg-base-200">
                        {/* Query */}

                        <td>
                          <div className="font-semibold capitalize">
                            {item.displayQuery || item.query}
                          </div>
                        </td>

                        {/* Location */}

                        <td>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin size={14} />

                            <span className="capitalize">{item.location}</span>
                          </div>
                        </td>

                        {/* Requested */}

                        <td>{item.totalRequested || 0}</td>

                        {/* Generated */}

                        <td>
                          <span className="font-semibold">
                            {item.leads?.length || 0}
                          </span>
                        </td>

                        {/* Status */}

                        <td>
                          {item.status === "completed" ? (
                            <span className="badge badge-success badge-sm">
                              Completed
                            </span>
                          ) : (
                            <span className="badge badge-warning badge-sm">
                              {item.status}
                            </span>
                          )}
                        </td>

                        {/* Arrow */}

                        <td>
                          <button className="btn btn-ghost btn-circle btn-sm">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
