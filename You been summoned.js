/*
 * Property
 * arguments, cookie, getTime, indexOf, length, setTime, substring,
 * toGMTString
 */

/**
 *
 *
 * @param {*} name
 * @returns
 */

function GetCookie (name) {
  const arg = name + "=";
  const alen = arg.length;
  const clen = document.cookie.length;
  let i = 0;
  while (i < clen) {
      const j = i + alen;
      if (document.cookie.substring(i, j) === arg) {
          return getCookieVal(j);
      }
      i = document.cookie.indexOf(" ", i) + 1;
      if (i === 0) {
          break;
      }
  }

  return null;
}

/**
 *
 *
 * @param {*} name
 * @param {*} value
 */

function SetCookie (name, value) {
  const argv = SetCookie.arguments;
  const argc = SetCookie.arguments.length;
  const expires = argc > 2 ? argv[2] : null;
  const path = argc > 3 ? argv[3] : null;
  const domain = argc > 4 ? argv[4] : null;
  const secure = argc > 5 ? argv[5] : false;
  document.cookie = name + "=" + escape(value) + (expires === null ? "" : "; expires=" + expires.toGMTString()) + (path === null ? "" : "; path=" + path) + (domain === null ? "" : "; domain=" + domain) + (secure === true ? "; secure" : "");
}

/**
 *
 *
 * @param {*} name
 */

function DeleteCookie (name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = new GetCookie(name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

const expDays = 30;
const exp = new Date();
exp.setTime(exp.getTime() + expDays * 24 * 60 * 60 * 1000);

/**
 *
 *
 * @returns
 */

function amt () {
  const count = GetCookie("count");
  if (count === null) {
      SetCookie("count", "1");

      return 1;
  }

  const newcount = parseInt(count) + 1;
  DeleteCookie("count");
  SetCookie("count", newcount, exp);

  return count;
}

/**
 *
 *
 * @param {*} offset
 * @returns
 */

function getCookieVal (offset) {
  let endstr = document.cookie.indexOf(";", offset);
  if (endstr === -1) {
      endstr = document.cookie.length;
  }

  return unescape(document.cookie.substring(offset, endstr));
}

// End
